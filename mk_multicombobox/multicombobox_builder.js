(function () {
	let template = document.createElement("template");
	template.innerHTML = `
		<style>
		:host {
			display: block;
			padding: 1em 1em 1em 1em;
		}
		</style>
	`;


	class DropdownMultiselectBuilderPanel extends HTMLElement {
		constructor() {
			super();
			this._shadowRoot = this.attachShadow({mode: "open"});
			this._shadowRoot.appendChild(template.content.cloneNode(true));
		}

	}

	customElements.define("com-sap-sample-mk-multicombobox-builder", DropdownMultiselectBuilderPanel);
})();