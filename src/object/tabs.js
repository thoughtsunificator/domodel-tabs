import { Observable } from "domodel"

/**
 * @global
 */
class Tabs extends Observable {

	/**
	 * @param {Tab[]} tabs
	 */
	constructor(tabs) {
		super()
		this._tabs = tabs
		this._tab = null
	}

	/**
	 * @param   {string} name
	 * @returns {Tab}
	 */
	getTabByName(name) {
		return this.tabs.find(tab => tab.name === name)
	}

	/**
	 * @readonly
	 * @type {Tab[]}
	 */
	get tabs() {
		return this._tabs
	}

	/**
	 * @type {Tab}
	 */
	get tab() {
		return this._tab
	}

	set tab(tab) {
		this._tab = tab
	}

}

export default Tabs
