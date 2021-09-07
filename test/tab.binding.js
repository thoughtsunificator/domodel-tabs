import { JSDOM } from "jsdom"
import { Core, Binding } from "domodel"

import TabModel from "../src/model/tab.js"

import TabBinding from "../src/model/tab.binding.js"

import { Tab, Tabs } from "../index.js"

const virtualDOM = new JSDOM(``)
const window = virtualDOM.window
const { document } = window

const RootModel = { tagName: "div" }
let rootBinding

const tabModel = { tagName: "div", id: "myTab" }

export function setUp(callback) {
	rootBinding = new Binding()
	Core.run(RootModel, { parentNode: document.body, binding: rootBinding })
	callback()
}

export function tearDown(callback) {
	rootBinding.remove()
	callback()
}

export function instance(test) {
	test.expect(1)
	test.ok(new TabBinding() instanceof Binding)
	test.done()
}

export function onCreated(test) {
	test.expect(6)
	const tab = new Tab("Test", tabModel, Binding)
	const tabs = new Tabs([ tab ])
	const binding = new TabBinding({ tab, tabs })
	rootBinding.run(TabModel, { binding })
	test.strictEqual(tab.active, false)
	test.strictEqual(binding.root.classList.contains("tab"), true)
	test.strictEqual(binding.root.classList.contains("active"), false)
	test.strictEqual(binding.root.children[0].id, "myTab")
	test.ok(binding._children[0] instanceof Binding)
	test.deepEqual(binding._parent, rootBinding)
	test.done()
}

export function set(test) {
	test.expect(2)
	const tab = new Tab("Test", tabModel, Binding)
	const tabs = new Tabs([ tab ])
	const binding = new TabBinding({ tab, tabs })
	rootBinding.run(TabModel, { binding })
	test.strictEqual(binding.root.classList.contains("active"), false)
	tab.emit("set")
	test.strictEqual(binding.root.classList.contains("active"), true)
	test.done()
}

export function unSet(test) {
	test.expect(3)
	const tab = new Tab("Test", tabModel, Binding)
	const tabs = new Tabs([ tab ])
	const binding = new TabBinding({ tab, tabs })
	rootBinding.run(TabModel, { binding })
	test.strictEqual(binding.root.classList.contains("active"), false)
	binding.root.classList.add("active")
	test.strictEqual(binding.root.classList.contains("active"), true)
	tab.emit("unset")
	test.strictEqual(binding.root.classList.contains("active"), false)
	test.done()
}
