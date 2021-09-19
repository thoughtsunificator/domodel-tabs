import assert from "assert"
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

describe("tab.binding", () => {

	beforeEach(() => {
		rootBinding = new Binding()
		Core.run(RootModel, { parentNode: document.body, binding: rootBinding })
	})

	afterEach(() => {
		rootBinding.remove()
	})

	it("instance", () => {
		assert.ok(new TabBinding() instanceof Binding)
	})

	it("onCreated", () => {
		const tab = new Tab("Test", tabModel, Binding)
		const tabs = new Tabs([ tab ])
		const binding = new TabBinding({ tab, tabs })
		rootBinding.run(TabModel, { binding })
		assert.strictEqual(tab.active, false)
		assert.strictEqual(binding.root.classList.contains("tab"), true)
		assert.strictEqual(binding.root.classList.contains("active"), false)
		assert.strictEqual(binding.root.children[0].id, "myTab")
		assert.ok(binding._children[0] instanceof Binding)
		assert.deepEqual(binding._parent, rootBinding)
	})

	it("set", () => {
		const tab = new Tab("Test", tabModel, Binding)
		const tabs = new Tabs([ tab ])
		const binding = new TabBinding({ tab, tabs })
		rootBinding.run(TabModel, { binding })
		assert.strictEqual(binding.root.classList.contains("active"), false)
		tab.emit("set")
		assert.strictEqual(binding.root.classList.contains("active"), true)
	})

	it("unSet", () => {
		const tab = new Tab("Test", tabModel, Binding)
		const tabs = new Tabs([ tab ])
		const binding = new TabBinding({ tab, tabs })
		rootBinding.run(TabModel, { binding })
		assert.strictEqual(binding.root.classList.contains("active"), false)
		binding.root.classList.add("active")
		assert.strictEqual(binding.root.classList.contains("active"), true)
		tab.emit("unset")
		assert.strictEqual(binding.root.classList.contains("active"), false)
	})

})
