import { EventListener } from "domodel"

/**
 * @global
 */
class TabsEventListener extends EventListener {

	/**
	 * @event EventListener#tabChanged
	 * @property {Tab} tab
	 */

	/**
	 * @event EventListener#tabSet
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
	 * @event EventListener#tabUnset
	 * @property {string} name
	 */
	tabUnset(name) {
		const { tabs } = this.properties
		const tab = tabs.getTabByName(name)
		tab.active = false
		tabs.tab = null
		tab.emit("unset")
		tabs.emit("tabChanged", null)
	}

}

export default TabsEventListener
