import { Binding } from "domodel"

import IndicatorModel from "./indicator.js"
import TabModel from "./tab.js"

import IndicatorBinding from "./indicator.binding.js"
import TabBinding from "./tab.binding.js"

import Tab from "../object/tab.js"

export default class extends Binding {

	onCreated() {

		const { tabs } = this.properties

		this.listen(tabs, "tab set", name => {
			if(tabs.tab) {
				tabs.emit("tab unset", tabs.tab.name)
			}
			const tab = tabs.getTabByName(name)
			tabs.tab = tab
			tab.active = true
			tab.emit("set")
			tabs.emit("tab changed", tab)
		})

		this.listen(tabs, "tab unset", name => {
			const tab = tabs.getTabByName(name)
			tab.active = false
			tabs.tab = null
			tab.emit("unset")
			tabs.emit("tab changed", null)
		})

		for(const tab of tabs.tabs) {
			this.run(IndicatorModel(tab), { parentNode: this.identifier.indicators, binding: new IndicatorBinding({ tab }) })
			this.run(TabModel, { parentNode: this.identifier.tabs, binding: new TabBinding({ tab }) })
		}

	}

}
