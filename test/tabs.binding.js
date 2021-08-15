import { JSDOM } from "jsdom"
import { Core, Binding } from "domodel"

import TabsModel from "../src/model/tabs.js"

import TabsBinding from "../src/model/tabs.binding.js"

import Tabs from "../src/object/tabs.js"
import Tab from "../src/object/tab.js"

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
	test.ok(new TabsBinding() instanceof Binding)
	test.done()
}

export function onCreated(test) {
	test.expect(14)
	const tab = new Tab("test", tabModel, Binding)
	const tab_ = new Tab("cxzcxz", tabModel, Binding)
	const tabs = new Tabs([ tab, tab_ ])
	const binding = new TabsBinding({ tabs })
	rootBinding.run(TabsModel, { binding })
	test.strictEqual(binding.identifier.indicators.children[0].classList.contains("indicator"), true)
	test.strictEqual(binding.identifier.indicators.children[0].textContent, "test")
	test.strictEqual(binding.identifier.indicators.children[1].classList.contains("indicator"), true)
	test.strictEqual(binding.identifier.indicators.children[1].textContent, "cxzcxz")
	test.strictEqual(binding.identifier.tabs.children[0].classList.contains("tab"), true)
	test.strictEqual(binding.identifier.tabs.children[1].classList.contains("tab"), true)
	test.strictEqual(binding._children.length, 4)
	test.strictEqual(tab.active, false)
	test.strictEqual(tab_.active, false)
	test.ok(binding._children[0] instanceof Binding)
	test.ok(binding._children[1] instanceof Binding)
	test.ok(binding._children[2] instanceof Binding)
	test.ok(binding._children[3] instanceof Binding)
	test.strictEqual(binding._parent, rootBinding)
	test.done()
}

export function tabSet(test) {
	test.expect(4)
	const tab = new Tab("test", tabModel, Binding)
	const tab_ = new Tab("cxzcxz", tabModel, Binding)
	const tabs = new Tabs([ tab, tab_ ])
	const binding = new TabsBinding({ tabs })
	rootBinding.run(TabsModel, { binding })
	test.strictEqual(tab.active, false)
	tabs.emit("tab set", "test")
	test.strictEqual(tab.active, true)
	tabs.emit("tab set", "cxzcxz")
	test.strictEqual(tab.active, false)
	test.strictEqual(tab_.active, true)
	test.done()
}

export function tabUnSet(test) {
	test.expect(5)
	const tab = new Tab("test", tabModel, Binding)
	const tab_ = new Tab("cxzcxz", tabModel, Binding)
	const tabs = new Tabs([ tab, tab_ ])
	const binding = new TabsBinding({ tabs })
	rootBinding.run(TabsModel, { binding })
	test.strictEqual(tab.active, false)
	tabs.emit("tab set", "test")
	test.strictEqual(tab.active, true)
	test.strictEqual(tab_.active, false)
	tabs.emit("tab unset", "test")
	test.strictEqual(tab.active, false)
	test.strictEqual(tab_.active, false)
	test.done()
}
