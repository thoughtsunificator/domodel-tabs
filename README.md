# domodel-tabs [![Build Status](https://travis-ci.com/thoughtsunificator/domodel-tabs.svg?branch=master)](https://travis-ci.com/thoughtsunificator/domodel-tabs)

Tabs system for [domodel](https://github.com/thoughtsunificator/domodel).

## Getting started

### Installing

``npm install @domodel/tabs``

### Usage

```javascript
import { Core, Binding } from "domodel"
import { Tab, Tabs, TabsModel, TabsBinding } from "@domodel/tabs"

import FirstTabModel from "/model/first-tab.js"
import FirstTabBinding from "/model/first-tab.binding.js"

import SecondTabModel from "/model/second-tab.js"
import SecondTabBinding from "/model/second-tab.binding.js"

export default class extends Binding {

	onCreated() {

		const tab1 = new Tab("Tab 1", FirstTabModel, FirstTabBinding)
		const tab2 = new Tab("Tab 2", SecondTabModel, SecondTabBinding)

		const tabs = new Tabs([ tab1, tab2 ])

		Core.run(TabsModel, { parentNode: this.root, binding: new TabsBinding({ tabs }) })

	}

}
```
