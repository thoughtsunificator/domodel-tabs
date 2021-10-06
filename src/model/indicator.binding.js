import { Binding } from "domodel"

/**
 * @global
 */
class IndicatorBinding extends Binding {

	/**
	 * @param {object} properties
	 * @param {Tab}    properties.tab
	 * @param {Tabs}   properties.tabs
	 */
	constructor(properties) {
		super(properties)
	}

	onCreated() {

		const { tab, tabs } = this.properties

		this.listen(tab, "set", () => {
			this.root.classList.add("active")
		})

		this.listen(tab, "unset", () => {
			this.root.classList.remove("active")
		})

		this.root.addEventListener("click", () => {
			tabs.emit("tabSet", tab.name)
		})

	}

}

export default IndicatorBinding
