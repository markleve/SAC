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
   
    <script id="oView" name="oView" type="sapui5/xmlview">
    <mvc:View
	    controllerName="myView.Template"
	    xmlns:mvc="sap.ui.core.mvc"
	    xmlns:core="sap.ui.core"
        xmlns="sap.m">
        <Panel expandable="true" headerText="Multicombo select values" width="auto" class="sapUiResponsiveMargin">
            <content>
                <Table id="idProductsTable"
                    inset="false"
                    items="{/SelectionList}"
                    fixedLayout="false">
                    <headerToolbar>
                        <OverflowToolbar>
                            <content>
                                <ToolbarSpacer/>
                                <ToggleButton id="addRow"
                                    icon="sap-icon://add"
                                    press="onAddRow" />
                                <ToggleButton id="deleteRow"
                                    icon="sap-icon://delete"
                                    press="onDeleteRow" />                   
                             </content>
                        </OverflowToolbar>
                     </headerToolbar>
                    <columns>
                        <Column>
                            <Text text="ID" />
                        </Column>
                        <Column>
                            <Text text="Text(Optional)" />
                        </Column>
                        <Column>
                            <Text text="Default" />
                        </Column>
                    </columns>
                    <items>
                        <ColumnListItem>
                            <cells>
                            <Input value="{id}"/>
                            <Input value="{text}"/>
                            <RadioButton selected="{selected}" />
                            </cells>
                        </ColumnListItem>
                    </items>
                </Table>
            </content>
        </Panel>
    </mvc:View>
</script>
	`;

	class MulticomboBoxBuilder extends HTMLElement {
		constructor() {
			super();
			this._shadowRoot = this.attachShadow({mode: "open"});
            this._shadowRoot.appendChild(template.content.cloneNode(true));
            

            _id = createGuid();

            this._shadowRoot.querySelector("#oView").id = _id + "_oView";


            _shadowRoot = this._shadowRoot;

            this.addEventListener("onAddRow", event => {
				var event = new Event("onSelectionChange");
				/* this.dispatchEvent(event); */
            });
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

            return Controller.extend("myView.Template", {

                onInit: function() {

                    this._data = {
                        SelectionList : [ 
                                    { id : 'Clock' , text : '1X2X5', selected: true}]	
                    };
                    
                    this.jModel = new sap.ui.model.json.JSONModel();
                    this.jModel.setData(this._data);

/*                     var oModel = new JSONModel({"SelectionList":[ {"id": "haha", "text": "jaja", "selected": true}]});
                    this.getView().setModel(oModel);
                    sap.ui.getCore().setModel(oModel); */
                },

                onBeforeRendering: function() {
                    this.getView().setModel(this.jModel);
                    sap.ui.getCore().setModel(this.jModel);
/*                     this.byId('ins').setModel(this.jModel); */	
                },

                onAddRow: function(oEvent) {
                    this._data.SelectionList.push({id : '', text : '', selected: false});
		            this.jModel.refresh();
                },

                onDeleteRow: function(oEvent) {
                    var deleteRecord = oEvent.getSource().getBindingContext().getObject();
		            for(var i=0;i<this._data.SelectionList.length;i++) {
			            if(this._data.SelectionList[i] == deleteRecord ) {
					//	pop this._data.Products[i] 
						this._data.SelectionList.splice(i,1); //removing 1 record from i th index.
						this.jModel.refresh();
						break;//quit the loop
					    }
		            }
                }

            });
        });

        //### THE APP: place the XMLView somewhere into DOM ###
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