(function()  {
    let _shadowRoot;
    let _id;

    let tmpl = document.createElement('template');
    tmpl.innerHTML = `
        <style>
        </style>

        <div id="ui5_content" name="ui5_content">
            <slot name="content"></slot>
        </div>

        <script id="oView" name="oView" type="sapui5/xmlview">
            <mvc:View
	            height="100%"
	            controllerName="myView.Template"
	            xmlns:l="sap.ui.layout"
	            xmlns:core="sap.ui.core"
	            xmlns:mvc="sap.ui.core.mvc"
	            xmlns="sap.m">
	            <l:VerticalLayout
		            class="sapUiContentPadding"
		            width="100%">
		            <MultiComboBox
			            selectionChange="handleSelectionChange"
			            selectionFinish="handleSelectionFinish"
			            width="350px"
			            items="{/ProductCollection}">
			            <core:Item key="{ProductId}" text="{Name}"/>
		            </MultiComboBox>
	            </l:VerticalLayout>
            </mvc:View>
        </script> 
    `;

    customElements.define('com-sap-sample-multicombobox', class WidgetTemplate extends HTMLElement {


		constructor() {
			super();            
            this._shadowRoot = this.attachShadow({mode: "open"});
            this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
            this._firstConnection = false;

            this._id = createGuid();

            this._shadowRoot.querySelector("#oView").id = this._id + "_oView";

            _id = this._id;
            _shadowRoot = this._shadowRoot;

            //Adding event handler for selection change
/* 			this.addEventListener("selectionChange", event => {
				var event = new Event("onSelectionChange");
				this.dispatchEvent(event);
            });
 */
            
            this._viewModel;
            this._multicombobox;
		}


        //Fired when the widget is added to the html DOM of the page
        connectedCallback(){
            this._firstConnection = true;
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
            if (this._firstConnection){
                this.redraw();
            }

            createUI5(this, oChangedProperties);
        }
        
        //When the custom widget is removed from the canvas or the analytic application is closed
        onCustomWidgetDestroy(){
        }

        //When the custom widget is resized on the canvas, the Custom Widget SDK framework executes the following JavaScript function call on the custom widget
        // Commented out by default.  If it is enabled, SAP Analytics Cloud will track DOM size changes and call this callback as needed
        //  If you don't need to react to resizes, you can save CPU by leaving it uncommented.
        /*
        onCustomWidgetResize(width, height){
        
        }
        */

        redraw(){
        }
        
        _firePropertiesChanged(selectedItemTexts, selectedItemKeys) {
            this.dispatchEvent(new CustomEvent("propertiesChanged", {
                detail: {
                    properties: {
                        selectedItemTexts: selectedItemTexts,
                        selectedItemKeys: selectedItemKeys
                    }
                }
            }));
        }

        //Getters and setters
        get selectedItemTexts() {
            return this._selectedItemText;
        }

        set selectedItemTexts(value) {
            this._selectedItemText = value;
        }

        get selectedItemKeys() {
            return this._selectedItemKey;
        }

        set selectedItemKeys(value) {
            this._selectedItemKey = value;
        }
        
        setSelectedKeys(oChangedProperties) {
            this._multicombobox.setSelectedKeys(oChangedProperties);
        }

        removeAllItems() {
            this._viewModel.setProperty("/ProductCollection", {});
        }
    
    });

    function createUI5(that, changedProperties) {

        var that_ = that;
      
        let content = document.createElement('div');
        content.slot = "content";
        that_.appendChild(content);

        sap.ui.getCore().attachInit(function() {
            "use strict";

            //### Controller ###
            sap.ui.define([
                    'sap/m/MessageToast',
                    'sap/ui/core/mvc/Controller',
                    'sap/ui/model/json/JSONModel'
                ], function(MessageToast, Controller, JSONModel) {
                "use strict";
        
                return Controller.extend("myView.Template", {
        
                    onInit: function () {
                        // set explored app's demo model on this sample
                        var oModel = new JSONModel("https://markleve.github.io/SAC/multicombobox/products.json");
                        this.getView().setModel(oModel);

                        that._viewModel = this.getView().getModel();

/*                         let mockData = {
                            "ProductCollection" : [
                                {
                                    "ProductId": "HT-1000",
                                    "Category": "Laptops",
                                    "MainCategory": "Computer Systems",
                                    "TaxTarifCode": "1",
                                    "SupplierName": "Very Best Screens",
                                    "Name": "Computer 1"
                                },
                                {
                                    "ProductId": "HT-1001",
                                    "Category": "Laptops",
                                    "MainCategory": "Computer Systems",
                                    "TaxTarifCode": "1",
                                    "SupplierName": "Very Best Screens",
                                    "Name": "Computer 2"
                                }]};

                        var oModel = new JSONModel(mockData);
                        //oModel.setData(mockData);
                        this.getView().setModel(oModel); */
                    },
        
                    handleSelectionChange: function(oEvent) {
                        that._multicombobox = oEvent.getSource();
/*                         if(that._new_keys.length > 0) {
                            oEvent.getSource().setSelectedKeys(that._new_keys);
                        } */

                        var selectedItems = oEvent.getSource().getSelectedItems();

                        var texts = selectedItems.map(key => key.getText());
                        var keys = selectedItems.map(key => key.getKey());

                        that._firePropertiesChanged(texts, keys);

                        //Remove all items
                        //this.getView().getModel().setProperty("/ProductCollection", {});

                        //Remove one item
                        //var allItems = this.getView().getModel().getProperty("/ProductCollection");
                        // allItems.splice(allItems.findIndex(item => item.ProductId === "HT-1001"),1);
                        //this.getView().getModel().setProperty("/ProductCollection", allItems)

                        //Add one item
                        //var allItems = this.getView().getModel().getProperty("/ProductCollection");
                        // allItems.push({ProductId: "productId", Name: "name"});
                        //this.getView().getModel().setProperty("/ProductCollection", allItems)


                        that.dispatchEvent(new CustomEvent("onSelectionChange"));
                    },
        
                    handleSelectionFinish: function(oEvent) {
                        var selectedItem = oEvent.getParameter("selectedItems");

                        //that._firePropertiesChanged(selectedItem.getText(), selectedItem.getKey());
                        
                        that.dispatchEvent(new CustomEvent("onSelectionFinished"));
                    },

                    removeAllItems() {

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