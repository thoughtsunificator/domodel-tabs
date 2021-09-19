import assert from "assert"
import { JSDOM } from "jsdom"
import { Core, Binding } from "domodel"

import IndicatorModel from "../src/model/indicator.js"

import IndicatorBinding from "../src/model/indicator.binding.js"

import { Tab, Tabs } from "../index.js"

const virtualDOM = new JSDOM(``)
const window = virtualDOM.window
const { document } = window

const RootModel = { tagName: "div" }
let rootBinding

describe("indicator.binding", () => {

	beforeEach(() => {
		rootBinding = new Binding()
		Core.run(RootModel, { parentNode: document.body, binding: rootBinding })
	})

	afterEach(() => {
		rootBinding.remove()
	})

	it("instance", () => {
		assert.ok(new IndicatorBinding() instanceof Binding)
	})

	it("onCreated", () => {
		const tab = new Tab("Test")
		const tabs = new Tabs([ tab ])
		const binding = new IndicatorBinding({ tab, tabs })
		rootBinding.run(IndicatorModel(tab), { binding })
		assert.strictEqual(binding.root.classList.contains("indicator"), true)
		assert.strictEqual(binding.root.textContent, "Test")
		assert.strictEqual(binding.root.classList.contains("active"), false)
	})

	it("set", () => {
		const tab = new Tab("Test")
		const tabs = new Tabs([ tab ])
		const binding = new IndicatorBinding({ tab, tabs })
		rootBinding.run(IndicatorModel, { binding })
		tab.emit("set")
		assert.strictEqual(binding.root.classList.contains("active"), true)
	})

	it("unSet", () => {
		const tab = new Tab("Test")
		const tabs = new Tabs([ tab ])
		const binding = new IndicatorBinding({ tab, tabs })
		rootBinding.run(IndicatorModel, { binding })
		binding.root.classList.add("active")
		assert.strictEqual(binding.root.classList.contains("active"), true)
		tab.emit("unset")
		assert.strictEqual(binding.root.classList.contains("active"), false)
	})

	it("click", (done) => {
		const tab = new Tab("Test")
		const tabs = new Tabs([ tab ])
		const binding = new IndicatorBinding({ tab, tabs })
		rootBinding.run(IndicatorModel, { binding })
		tabs.listen("tab set", name => {
			assert.strictEqual(name, tab.name)
			done()
		})
		binding.root.dispatchEvent(new window.Event("click"))
	})

})
