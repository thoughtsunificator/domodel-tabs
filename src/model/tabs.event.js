import { EventListener } from "domodel"

/**
 * @global
 */
class TabsEventListener extends EventListener {

	/**
	 * @event TabsEventListener#tabChanged
	 * @property {Tab} tab
	 */

	/**
	 * @event TabsEventListener#tabSet
	 * @property {string} name
	 */
	tabSet(name) {
		const { tabs } = this.properties
		if(tabs.tab) {
			tabs.emit("tabUnset", tabs.tab.name)
		}
		const tab = tabs.getTabByName(name)
		tabs.tab = tab
		tab.active = true
		tab.emit("set")
		tabs.emit("tabChanged", tab)
	}

	/**
	 * @event TabsEventListener#tabUnset
	 * @property {string} name
	 */
	tabUnset(name) {
		const { tabs } = this.properties
		const tab = tabs.getTabByName(name)
		tab.active = false
		tabs.tab = null
		tab.emit("unset")
	}

}

export default TabsEventListener
