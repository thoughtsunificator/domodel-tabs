import { EventListener } from "domodel"

/**
 * @global
 */
class TabEventListener extends EventListener {

	set() {
		this.root.classList.add("active")
	}

	unset() {
		this.root.classList.remove("active")
	}

}

export default TabEventListener
