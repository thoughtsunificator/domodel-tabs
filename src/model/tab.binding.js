import { Binding } from "domodel"

export default class extends Binding {

	onCreated() {

		const { tab } = this.properties

		this.listen(tab, "set", () => {
			this.root.classList.add("active")
		})

		this.listen(tab, "unset", () => {
			this.root.classList.remove("active")
		})

		this.run(tab.model, { binding: new tab.binding() })

	}

}
