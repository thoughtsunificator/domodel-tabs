import { EventListener } from "domodel"

/**
 * @global
 */
class TabEventListener extends EventListener {

	/**
	 * @event TabEventListener#set
	 */
	set() {
		this.root.classList.add("active")
	}

	/**
	 * @event TabEventListener#unset
	 */
	unset() {
		this.root.classList.remove("active")
	}

}

export default TabEventListener
