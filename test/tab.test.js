import assert from "assert"
import { Observable, Binding } from "domodel"

import { Tab } from "../index.js"

describe("tab", () => {

	it("instance", () => {
		const model = { tagName: "div" }
		const tab = new Tab("vcxvcsa", model, Binding)
		assert.ok(tab instanceof Observable)
		assert.strictEqual(tab.name, "vcxvcsa")
		assert.deepEqual(tab.model, model)
		assert.ok(new tab.binding() instanceof Binding)
		assert.strictEqual(tab.active, false)
		assert.throws(() => {
			tab.name = 1
			tab.model = 1
			tab.binding = 1
		})
		assert.doesNotThrow(() => {
			tab.active = true
		})
	})

})
