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
            buildTable(this);

        }
        
        //When the custom widget is removed from the canvas or the analytic application is closed
        onCustomWidgetDestroy(){
        
        }

        redraw() {

        }

	}

customElements.define("com-sap-sample-multicombobox-builder", MulticomboBoxBuilder);

function buildTable(that) {

    var that_ = that;

    let content = document.createElement('div');
    content.slot = "content";
    that_.appendChild(content);

    var oView = sap.ui.jsview("myView.Template", {

        /** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
         * Since the Controller is given to this method, its event handlers can be attached right away. 
         * @memberOf maintplan.PlannedKm.view.kmTable
         */
        createContent: function (oController) {

            var table = new sap.ui.table.Table({
                title: 'Table title',
                toolbar: new sap.m.Toolbar({
                    content: [
                        new sap.m.Button({
                            icon: "sap-icon://add",
                            press: function() {
                                sap.m.MessageToast.show("Pressed add");
                            }
    
                        }),
                        new sap.m.Button({
                            icon: "sap-icon://delete",
                            press: function() {
                                sap.m.MessageToast.show("Pressed delete");
                            }
    
                        })
                    ]
                }),
                columns: [
                    new sap.ui.table.Column({
                        label: new sap.m.Label({text: "ID"}),
                        template: new sap.m.Input({
                            value: "AA"
                        })
                    }),
                    new sap.ui.table.Column({
                        label: new sap.m.Label({text: "Text(Optional)"}),
                        template: new sap.m.Input({
                            value: "BB"
                        })

                    }),
                    new sap.ui.table.Column({
                        label: new sap.m.Label({text: "Default"}),
                        template: new sap.m.RadioButton({
                            selected: "{checked}"
                        })

                    })

                ]

            });

/*             table.setToolbar(new sap.m.Toolbar({
                content: [
                    new sap.m.Button({
                        icon: "sap-icon://add",
                        press: function() {
                            sap.m.MessageToast.show("Pressed add");
                        }

                    }),
                    new sap.m.Button({
                        icon: "sap-icon://delete",
                        press: function() {
                            sap.m.MessageToast.show("Pressed delete");
                        }

                    })
                ]
            }));
 */


/*             var MultiCompboBox = new sap.m.MultiCompboBox({
                selectionChange: [oController.handleSelectionChange, oController],
                selectionFinish: [oController.handleSelectionFinish, oController],
                items: [
                    new sap.ui.core.Item({
                        id: "selection1",
                        key: "selection1",
                        text: "Selection 1 (new)"
                    }),
                    new sap.ui.core.Item({
                        id: "selection2",
                        key: "selection2",
                        text: "Selection 2 (new)"
                    }),
                    new sap.ui.core.Item({
                        id: "selection3",
                        key: "selection3",
                        text: "Selection 3 (new)"
                    })
                ]
            }); */
            return table;
        }
    });

    oView.placeAt(content);

}
})();