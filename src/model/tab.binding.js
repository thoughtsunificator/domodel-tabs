import { Binding } from "domodel"

import TabEventListener from "./tab.event.js"

/**
 * @global
 */
class TabBinding extends Binding {

	/**
	 * @param {object} properties
	 * @param {Tab}    properties.tab
	 */
	constructor(properties) {
		super(properties, new TabEventListener(properties.tab))
	}

	onCreated() {

		const { tab } = this.properties

		this.run(tab.model, { binding: new tab.binding(tab.properties) })

	}

}

export default TabBinding
