import { Observable, Binding } from "domodel"

import { Tab } from "../index.js"

export function instance(test) {
	test.expect(7)
	const model = { tagName: "div" }
	const tab = new Tab("vcxvcsa", model, Binding)
	test.ok(tab instanceof Observable)
	test.strictEqual(tab.name, "vcxvcsa")
	test.deepEqual(tab.model, model)
	test.ok(new tab.binding() instanceof Binding)
	test.strictEqual(tab.active, false)
	test.throws(() => {
		tab.name = 1
		tab.model = 1
		tab.binding = 1
	})
	test.doesNotThrow(() => {
		tab.active = true
	})
	test.done()
}
