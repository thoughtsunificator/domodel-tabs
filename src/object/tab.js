import { Observable } from "domodel"

/**
 * @global
 */
class Tab extends Observable {

	/**
	 * @param  {string}  name
	 * @param  {object}  model
	 * @param  {Binding} binding
	 */
	constructor(name, model, binding, properties = {}) {
		super()
		this._name = name
		this._model = model
		this._binding = binding
		this._properties = properties
		this._active = false
	}

	/**
	 * @return {string}
	 */
	get name() {
		return this._name
	}

	/**
	 * @type {object}
	 */
	get model() {
		return this._model
	}

	/**
	 * @type {Binding}
	 */
	get binding() {
		return this._binding
	}

	/**
	 * @type {object}
	 */
	get properties() {
		return this._properties
	}

	/**
	 * @type {boolean}
	 */
	get active() {
		return this._active
	}

	set active(active) {
		this._active = active
	}

}

export default Tab
