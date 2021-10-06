import { Binding } from "domodel"

import IndicatorModel from "./indicator.js"
import TabModel from "./tab.js"

import IndicatorBinding from "./indicator.binding.js"
import TabBinding from "./tab.binding.js"

import Tab from "../object/tab.js"

import TabsEventListener from "./tabs.event.js"

/**
 * @global
 */
class TabsBinding extends Binding {

	/**
	 * @param {object} properties
	 * @param {Tabs}   properties.tabs
	 */
	constructor(properties) {
		super(properties, new TabsEventListener(properties.tabs))
	}

	onCreated() {

		const { tabs } = this.properties

		for(const tab of tabs.tabs) {
			this.run(IndicatorModel(tab), { parentNode: this.identifier.indicators, binding: new IndicatorBinding({ tab }) })
			this.run(TabModel, { parentNode: this.identifier.tabs, binding: new TabBinding({ tab }) })
		}

	}

}

export default TabsBinding
