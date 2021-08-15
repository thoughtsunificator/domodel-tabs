import { JSDOM } from "jsdom"
import { Core, Binding } from "domodel"

import IndicatorModel from "../src/model/indicator.js"

import IndicatorBinding from "../src/model/indicator.binding.js"

import Tab from "../src/object/tab.js"
import Tabs from "../src/object/tabs.js"

const virtualDOM = new JSDOM(``)
const window = virtualDOM.window
const { document } = window

const RootModel = { tagName: "div" }
let rootBinding

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
	test.ok(new IndicatorBinding() instanceof Binding)
	test.done()
}

export function onCreated(test) {
	test.expect(3)
	const tab = new Tab("Test")
	const tabs = new Tabs([ tab ])
	const binding = new IndicatorBinding({ tab, tabs })
	rootBinding.run(IndicatorModel(tab), { binding })
	test.strictEqual(binding.root.classList.contains("indicator"), true)
	test.strictEqual(binding.root.textContent, "Test")
	test.strictEqual(binding.root.classList.contains("active"), false)
	test.done()
}

export function set(test) {
	test.expect(1)
	const tab = new Tab("Test")
	const tabs = new Tabs([ tab ])
	const binding = new IndicatorBinding({ tab, tabs })
	rootBinding.run(IndicatorModel, { binding })
	tab.emit("set")
	test.strictEqual(binding.root.classList.contains("active"), true)
	test.done()
}

export function unSet(test) {
	test.expect(2)
	const tab = new Tab("Test")
	const tabs = new Tabs([ tab ])
	const binding = new IndicatorBinding({ tab, tabs })
	rootBinding.run(IndicatorModel, { binding })
	binding.root.classList.add("active")
	test.strictEqual(binding.root.classList.contains("active"), true)
	tab.emit("unset")
	test.strictEqual(binding.root.classList.contains("active"), false)
	test.done()
}

export function click(test) {
	test.expect(1)
	const tab = new Tab("Test")
	const tabs = new Tabs([ tab ])
	const binding = new IndicatorBinding({ tab, tabs })
	rootBinding.run(IndicatorModel, { binding })
	tabs.listen("tab set", name => {
		test.strictEqual(name, tab.name)
		test.done()
	})
	binding.root.dispatchEvent(new window.Event("click"))
}
