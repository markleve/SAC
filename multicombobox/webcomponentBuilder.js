(function() {

    let _id;
    let _shadowRoot;

	let template = document.createElement("template");
    template.innerHTML = `

    <style>
    </style>

    <div id="ui5_content" name="ui5_content">
    <slot name="content"> </slot>
    </div>
   
    <script id="test_oView" name="oView" type="sapui5/xmlview">
    <mvc:View
	controllerName="sap.m.sample.Table.Table"
	xmlns:mvc="sap.ui.core.mvc"
	xmlns:core="sap.ui.core"
	xmlns="sap.m">
	<Table id="idProductsTable"
		inset="false"
		items="{
			path: '/ProductCollection',
			sorter: {
				path: 'Name'
			}
		}">
		<headerToolbar>
			<OverflowToolbar>
				<content>
					<Title text="Products" level="H2"/>
					<ToolbarSpacer />
					<ComboBox id="idPopinLayout"
						placeholder="Popin layout options"
						change="onPopinLayoutChanged">
						<items>
							<core:Item  text="Block"
								key="Block"/>
							<core:Item  text="Grid Large"
								key="GridLarge"/>
							<core:Item  text="Grid Small"
								key="GridSmall"/>
						</items>
					</ComboBox>
					<Label text="Sticky options:" />
					<CheckBox text="ColumnHeaders"
						select="onSelect"/>
					<CheckBox text="HeaderToolbar"
						select="onSelect"/>
					<CheckBox text="InfoToolbar"
						select="onSelect"/>
					<ToggleButton id="toggleInfoToolbar"
						text="Hide/Show InfoToolbar"
						press="onToggleInfoToolbar" />
				</content>
			</OverflowToolbar>
		</headerToolbar>
		<infoToolbar>
			<OverflowToolbar>
				<Label text="Wide range of available products"/>
			</OverflowToolbar>
		</infoToolbar>
		<columns>
			<Column
				width="12em">
				<Text text="Product" />
			</Column>
			<Column
				minScreenWidth="Tablet"
				demandPopin="true">
				<Text text="Supplier" />
			</Column>
			<Column
				minScreenWidth="Desktop"
				demandPopin="true"
				hAlign="End">
				<Text text="Dimensions" />
			</Column>
			<Column
				minScreenWidth="Desktop"
				demandPopin="true"
				hAlign="Center">
				<Text text="Weight" />
			</Column>
			<Column
				hAlign="End">
				<Text text="Price" />
			</Column>
		</columns>
		<items>
			<ColumnListItem>
				<cells>
					<ObjectIdentifier
						title="{Name}"
						text="{ProductId}"/>
					<Text
						text="{SupplierName}" />
					<Text
						text="{Width} x {Depth} x {Height} {DimUnit}" />
					<ObjectNumber
						number="{WeightMeasure}"
						unit="{WeightUnit}"
						state="{
							parts: [
								{path: 'WeightMeasure'},
								{path: 'WeightUnit'}
							],
							formatter: 'sap.m.sample.Table.Formatter.weightState'
						}" />
					<ObjectNumber
							number="{
								parts:[{path:'Price'},{path:'CurrencyCode'}],
								type: 'sap.ui.model.type.Currency',
								formatOptions: {showMeasure: false}
							}"
							unit="{CurrencyCode}" />
				</cells>
			</ColumnListItem>
		</items>
	</Table>
</mvc:View>
</script>
	`;

	class MulticomboBoxBuilder extends HTMLElement {
		constructor() {
			super();
			this._shadowRoot = this.attachShadow({mode: "open"});
            this._shadowRoot.appendChild(template.content.cloneNode(true));
            

            _id = createGuid();

            this._shadowRoot.querySelector("#test_oView").id = this._id + "_oView";


            _shadowRoot = this._shadowRoot;
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

     sap.ui.getCore().attachInit(function () {
        "use strict";

        //### Controller ###
        sap.ui.define([
            "jquery.sap.global",
            "sap/ui/core/mvc/Controller",
            "sap/ui/model/json/JSONModel"
        ], function (jQuery, Controller, JSONModel) {
            "use strict";

            return Controller.extend("myView.Template");
        });
        //### THE APP: place the XMLView somewhere into DOM ###
/*         var oView = new sap.ui.jsview("myView.Template", { */


            /** Specifies the Controller belonging to this View. 
            * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
            * @memberOf maintplan.PlannedKm.view.kmTable
            */
             /* getControllerName: function () {
                console.log("in oView, getControllerName")
                return "nameOfController";
            }, */
 
            /** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
             * Since the Controller is given to this method, its event handlers can be attached right away. 
             * @memberOf maintplan.PlannedKm.view.kmTable
             */
             /* createContent: function (oController) { 

                  var table = new sap.ui.table.Table({
                    title: 'Table title',
                    toolbar: new sap.m.Toolbar({
                        content: [
                            new sap.m.Button({
                                icon: "sap-icon://add",
                                press: function() {
                                    sap.m.MessageToast.show("Pressed add");
                                }
                        
                            }),
                            new sap.m.Button({
                                icon: "sap-icon://delete",
                                press: function() {
                                    sap.m.MessageToast.show("Pressed delete");
                                }
                            })
                        ]
                    }),
                    columns: [
                        new sap.ui.table.Column({
                            label: new sap.m.Label({text: "ID"}),
                            template: new sap.m.Input({ value: "AA" })
                        }),
                        new sap.ui.table.Column({
                            label: new sap.m.Label({text: "Text(Optional)"}),
                            template: new sap.m.Input({ value: "BB" })
                        }),
                        new sap.ui.table.Column({
                            label: new sap.m.Label({text: "Default"}),
                            template: new sap.m.RadioButton({ selected: "{checked}" })
                        })
                    ]
                });
                return table;  


             }  */
/*         }); */

/*         oView.placeAt(content);  */

        var oView  = sap.ui.xmlview({
            viewContent: jQuery(_shadowRoot.getElementById(_id + "_oView")).html(),
        });

        oView.placeAt(content);

     });  
}

function createGuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
        let r = Math.random() * 16 | 0,
            v = c === "x" ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
} 

})();