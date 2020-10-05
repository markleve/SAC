(function() {
	let template = document.createElement("template");
	template.innerHTML = `
        <form id="form">
        <fieldset>
            <legend>Color Properties</legend>
            <Table
				rows=""
				selectionMode="MultiToggle"
				visibleRowCount="7"
				paste="onPaste"
				ariaLabelledBy="title">
				<extension>
					<m:OverflowToolbar>
						<m:Title id="title" text="Products"/>
					</m:OverflowToolbar>
				</extension>
				<columns>
                    <Column width="11rem">
                        <m:Label text="ID" />
                            <template>
                                <m:Input value="Ha"/>
                            </template>
                    </Column>
					<Column width="11rem">
						<m:Label text="Text (Optional)" />
						<template>
							<m:Input value="aa"/>
						</template>
                    </Column>
                    <Column width="11rem">
						<m:Label text="Text (Optional)" />
						<template>
							<m:Input value="a"/>
						</template>
					</Column>
				</columns>
			</Table>
            <input type="submit" style="display:none;">
        </fieldset>
    </form>

    <style>
    :host {
        display: block;
        padding: 1em 1em 1em 1em;
    }
    </style>

            
	`;

	class MulticomboBoxBuilder extends HTMLElement {
		constructor() {
			super();
			this._shadowRoot = this.attachShadow({mode: "open"});
            this._shadowRoot.appendChild(template.content.cloneNode(true));
		}

        //Fired when the widget is added to the html DOM of the page
        connectedCallback(){
            this.redraw();
        }

         //Fired when the widget is removed from the html DOM of the page (e.g. by hide)
        disconnectedCallback(){
        
        }

         //When the custom widget is updated, the Custom Widget SDK framework executes this function first
		onCustomWidgetBeforeUpdate(oChangedProperties) {

		}

        //When the custom widget is updated, the Custom Widget SDK framework executes this function after the update
		onCustomWidgetAfterUpdate(oChangedProperties) {

        }
        
        //When the custom widget is removed from the canvas or the analytic application is closed
        onCustomWidgetDestroy(){
        
        }

        redraw() {

        }

	}

customElements.define("com-sap-sample-multicombobox-builder", MulticomboBoxBuilder);
})();