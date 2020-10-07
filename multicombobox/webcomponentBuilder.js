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
    class="sapUiSizeCompact"
	xmlns:mvc="sap.ui.core.mvc"
	xmlns:core="sap.ui.core"
    xmlns="sap.m">
    <Panel expandable="true" headerText="Multicombo select values" width="auto" class="sapUiResponsiveMargin">
        <content>
        <Table id="idProductsTable"
        mode= "SingleSelectMaster"
        selectionChange = "onPress"
		items="{/SelectionList}">
		<headerToolbar>
			<OverflowToolbar>
                <content>
                <ToggleButton id="apply"
                        text="Apply change"
                        press="onApply" />
                    <ToolbarSpacer/>
					<ToggleButton id="addRow"
                        icon="sap-icon://add"
                        press="onAddRow" />
                    <ToggleButton id="deleteRow"
                        icon="sap-icon://delete"
                        press="onDeleteRow" />                   
				</content>
			</OverflowToolbar>
		</headerToolbar>
		<columns>
			<Column>
				<Text text="ID" />
			</Column>
			<Column>
				<Text text="Text(Optional)" />
			</Column>
			<Column>
				<Text text="Default" />
			</Column>
		</columns>
		<items>
			<ColumnListItem>
                <cells>
                <Input value="{id}"/>
                <Input value="{text}"/>
                <RadioButton selected="{selected}" />
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
		}

        //Fired when the widget is added to the html DOM of the page
        connectedCallback(){
            this.redraw();
        }

        _changeProperty(property) {
            this.dispatchEvent(new CustomEvent("propertiesChanged", {
                detail: {
                    properties: {
                        multicomboboxRows: property
                    }
                }
            }));
        }

         //Fired when the widget is removed from the html DOM of the page (e.g. by hide)
        disconnectedCallback(){
        
        }

         //When the custom widget is updated, the Custom Widget SDK framework executes this function first
		onCustomWidgetBeforeUpdate(oChangedProperties) {

		}

        //When the custom widget is updated, the Custom Widget SDK framework executes this function after the update
		onCustomWidgetAfterUpdate(oChangedProperties) {
            buildTable(this, oChangedProperties);

        }
        
        //When the custom widget is removed from the canvas or the analytic application is closed
        onCustomWidgetDestroy(){
        
        }

        redraw() {

        }

        get multicomboboxRows() {
            return this._viewModel.getProperty("/SelectionList");
        }

        set multicomboboxRows(value) {
            if(this._viewModel !== undefined) {
                this._viewModel.setProperty("/SelectionList", value);
            }
        }

	}

customElements.define("com-sap-sample-multicombobox-builder", MulticomboBoxBuilder);

function buildTable(that, changedProperties) {

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

                    if("multicomboboxRows" in changedProperties) {
                        var rows = changedProperties["multicomboboxRows"];
                        if(rows === undefined) {
                            rows = "[]";
                        }

                        this.jModel = new sap.ui.model.json.JSONModel();
                        this.jModel.setProperty("/SelectionList",JSON.parse(rows));
                    } else {
                        this._data = { SelectionList : [ ]  };
                        this.jModel = new sap.ui.model.json.JSONModel();
                        this.jModel.setData(this._data);
                    }
                },

                onBeforeRendering: function() {
                    this.getView().setModel(this.jModel);
                    sap.ui.getCore().setModel(this.jModel);	

                    that._viewModel = this.getView().getModel();
                },

                onAddRow: function(oEvent) {
                    this.jModel.getData().SelectionList.push({id : '', text : '', selected: false});
		            this.jModel.refresh();
                },

                onPress: function(oEvent) {
                    this.selectedRow = oEvent.getSource().indexOfItem(
                        oEvent.getParameters().listItem);
                },

                onDeleteRow: function(oEvent) {
                    if (this.selectedRow !== undefined) {
                        this.jModel.getData().SelectionList.splice(this.selectedRow,1);
                        this.jModel.refresh();
                    }
                },

                onApply: function(oEvent) {
                    //loop at all values and send one by one
                    var model = this.getView().getModel().getProperty("/SelectionList");
                    that_._changeProperty(JSON.stringify(model));

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