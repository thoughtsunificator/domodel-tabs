import { Observable } from "domodel"

import { Tabs } from "../index.js"

export function instance(test) {
	test.expect(5)
	const tabs = new Tabs([])
	test.ok(tabs instanceof Observable)
	test.ok(Array.isArray(tabs.tabs))
	test.strictEqual(tabs.tab, null)
	test.throws(() => {
		tabs.tabs = 1
	})
	test.doesNotThrow(() => {
		tabs.tab = 1
	})
	test.done()
}

export function getTabByName(test) {
	test.expect(3)
	const tabs = new Tabs([{name: "test"}, { name: "a" }, { name: "b" }])
	test.strictEqual(tabs.getTabByName("test").name, "test")
	test.strictEqual(tabs.getTabByName("a").name, "a")
	test.strictEqual(tabs.getTabByName("b").name, "b")
	test.done()
}
