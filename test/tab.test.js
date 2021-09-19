import assert from "assert"
import { Observable, Binding } from "domodel"

import { Tab } from "../index.js"

describe("tab", () => {

	it("instance", () => {
		const model = { tagName: "div" }
		const tab = new Tab("vcxvcsa", model, Binding, { test: "a" })
		assert.ok(tab instanceof Observable)
		assert.strictEqual(tab.name, "vcxvcsa")
		assert.deepEqual(tab.model, model)
		assert.ok(new tab.binding() instanceof Binding)
		assert.strictEqual(tab.active, false)
		assert.deepEqual(tab.properties, { test: "a" })
		assert.throws(() => {
			tab.name = 1
		})
		assert.throws(() => {
			tab.model = 1
		})
		assert.throws(() => {
			tab.binding = 1
		})
		assert.throws(() => {
			tab.properties = 1
		})
		assert.doesNotThrow(() => {
			tab.active = true
		})
	})

})
