import assert from "assert"
import { JSDOM } from "jsdom"
import { Core, Binding } from "domodel"

import TabsModel from "../src/model/tabs.js"

import TabsBinding from "../src/model/tabs.binding.js"

import { Tab, Tabs } from "../index.js"

const virtualDOM = new JSDOM(``)
const window = virtualDOM.window
const { document } = window

const RootModel = { tagName: "div" }
let rootBinding

const tabModel = { tagName: "div", id: "myTab" }

describe("tabs.binding", () => {

	beforeEach(() => {
		rootBinding = new Binding()
		Core.run(RootModel, { parentNode: document.body, binding: rootBinding })
	})

	afterEach(() => {
		rootBinding.remove()
	})

	it("instance", () => {
		assert.ok(TabsBinding.prototype instanceof Binding)
	})

	it("onCreated", () => {
		const tab = new Tab("test", tabModel, Binding)
		const tab_ = new Tab("cxzcxz", tabModel, Binding)
		const tabs = new Tabs([ tab, tab_ ])
		const binding = new TabsBinding({ tabs })
		rootBinding.run(TabsModel, { binding })
		assert.strictEqual(binding.identifier.indicators.children[0].classList.contains("indicator"), true)
		assert.strictEqual(binding.identifier.indicators.children[0].textContent, "test")
		assert.strictEqual(binding.identifier.indicators.children[1].classList.contains("indicator"), true)
		assert.strictEqual(binding.identifier.indicators.children[1].textContent, "cxzcxz")
		assert.strictEqual(binding.identifier.tabs.children[0].classList.contains("tab"), true)
		assert.strictEqual(binding.identifier.tabs.children[1].classList.contains("tab"), true)
		assert.strictEqual(binding._children.length, 4)
		assert.strictEqual(tab.active, false)
		assert.strictEqual(tab_.active, false)
		assert.ok(binding._children[0] instanceof Binding)
		assert.ok(binding._children[1] instanceof Binding)
		assert.ok(binding._children[2] instanceof Binding)
		assert.ok(binding._children[3] instanceof Binding)
		assert.strictEqual(binding._parent, rootBinding)
	})

	it("tabSet", () => {
		const tab = new Tab("test", tabModel, Binding)
		const tab_ = new Tab("cxzcxz", tabModel, Binding)
		const tabs = new Tabs([ tab, tab_ ])
		const binding = new TabsBinding({ tabs })
		rootBinding.run(TabsModel, { binding })
		assert.strictEqual(tab.active, false)
		tabs.emit("tabSet", "test")
		assert.strictEqual(tab.active, true)
		tabs.emit("tabSet", "cxzcxz")
		assert.strictEqual(tab.active, false)
		assert.strictEqual(tab_.active, true)
	})

	it("tabUnSet", () => {
		const tab = new Tab("test", tabModel, Binding)
		const tab_ = new Tab("cxzcxz", tabModel, Binding)
		const tabs = new Tabs([ tab, tab_ ])
		const binding = new TabsBinding({ tabs })
		rootBinding.run(TabsModel, { binding })
		assert.strictEqual(tab.active, false)
		tabs.emit("tabSet", "test")
		assert.strictEqual(tab.active, true)
		assert.strictEqual(tab_.active, false)
		tabs.emit("tabUnset", "test")
		assert.strictEqual(tab.active, false)
		assert.strictEqual(tab_.active, false)
	})

})
