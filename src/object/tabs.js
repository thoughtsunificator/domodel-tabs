/** @module tabs */

import { Observable } from "domodel"

/**
	* @memberof: module: tabs
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

	getTabByName(name) {
		return this.tabs.find(tab => tab.name === name)
	}

	/**
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
