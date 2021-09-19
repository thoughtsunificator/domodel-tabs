import assert from "assert"
import { Observable } from "domodel"

import { Tabs } from "../index.js"

describe("tabs", () => {

	it("instance", () => {
		const tabs = new Tabs([])
		assert.ok(tabs instanceof Observable)
		assert.ok(Array.isArray(tabs.tabs))
		assert.strictEqual(tabs.tab, null)
		assert.throws(() => {
			tabs.tabs = 1
		})
		assert.doesNotThrow(() => {
			tabs.tab = 1
		})
	})

	it("getTabByName", () => {
		const tabs = new Tabs([{name: "test"}, { name: "a" }, { name: "b" }])
		assert.strictEqual(tabs.getTabByName("test").name, "test")
		assert.strictEqual(tabs.getTabByName("a").name, "a")
		assert.strictEqual(tabs.getTabByName("b").name, "b")
	})

})
