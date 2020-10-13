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
        controllerName="myView.Template"
        xmlns="sap.ui.table"
        xmlns:mvc="sap.ui.core.mvc"
        xmlns:u="sap.ui.unified"
        xmlns:c="sap.ui.core"
        xmlns:m="sap.m"
        height="100%">
        <m:Page
            showHeader="false"
            enableScrolling="false"
            class="sapUiContentPadding">
            <m:content>
                <Table
                    rows="{/ProductCollection}"
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
                            <m:Label text="Product Name" />
                            <template>
                                <m:Text text="{Name}" wrapping="false" />
                            </template>
                        </Column>
                        <Column width="11rem">
                            <m:Label text="Product Id" />
                            <template>
                                <m:Input id="input_test" value="{ProductId}"/>
                            </template>
                        </Column>
                        <Column width="6rem" hAlign="End">
                            <m:Label text="Quantity" />
                            <template>
                                <m:Label text="{Quantity}" />
                            </template>
                        </Column>
                        <Column width="9rem">
                            <m:Label text="Status" />
                            <template>
                                <m:ObjectStatus text="{Status}" state="{
                                    path: 'Available',
                                    formatter: '.formatAvailableToObjectState'
                                }"/>
                            </template>
                        </Column>
                        <Column width="9rem">
                            <m:Label text="Price" />
                            <template>
                                <u:Currency value="{Price}" currency="{CurrencyCode}"/>
                            </template>
                        </Column>
                        <Column width="9rem">
                            <m:Label text="Image" />
                            <template>
                                <m:Link text="Show Image" href="{ProductPicUrl}" target="_blank"/>
                            </template>
                        </Column>
                        <Column width="9rem">
                            <m:Label text="Details" />
                            <template>
                                <m:Button text="Show Details" press="handleDetailsPress"/>
                            </template>
                        </Column>
                      </columns>
                </Table>
            </m:content>
        </m:Page>
    </mvc:View>
        </script> 
    `;

    customElements.define('com-sap-sample-mk-table', class WidgetTemplate extends HTMLElement {


		constructor() {
			super();            
            this._shadowRoot = this.attachShadow({mode: "open"});
            this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
            this._firstConnection = false;

            this._id = createGuid();

            this._shadowRoot.querySelector("#oView").id = this._id + "_oView";

            _id = this._id;
            _shadowRoot = this._shadowRoot;

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
                "sap/base/Log",
                "sap/ui/core/mvc/Controller",
                "sap/ui/model/json/JSONModel",
                "sap/m/MessageToast",
                "sap/ui/core/format/DateFormat",
                "sap/ui/thirdparty/jquery"
            ], function(Log, Controller, JSONModel, MessageToast, DateFormat, jQuery) {
                "use strict";
            
                return Controller.extend("myView.Template", {
            
                    onInit : function() {
                        // set explored app's demo model on this sample
                        var oJSONModel = this.initSampleDataModel();
                        this.getView().setModel(oJSONModel);
                    },
            
                    initSampleDataModel : function() {
                        var oModel = new JSONModel("https://markleve.github.io/SAC/table/products.json");
            
                        var oDateFormat = DateFormat.getDateInstance({source: {pattern: "timestamp"}, pattern: "dd/MM/yyyy"});
            
                        /* jQuery.ajax(sap.ui.require.toUrl("https://markleve.github.io/SAC/table/products.json"), {
                            dataType: "json",
                            success: function(oData) {
                                var aTemp1 = [];
                                var aTemp2 = [];
                                var aSuppliersData = [];
                                var aCategoryData = [];
                                for (var i = 0; i < oData.ProductCollection.length; i++) {
                                    var oProduct = oData.ProductCollection[i];
                                    if (oProduct.SupplierName && aTemp1.indexOf(oProduct.SupplierName) < 0) {
                                        aTemp1.push(oProduct.SupplierName);
                                        aSuppliersData.push({Name: oProduct.SupplierName});
                                    }
                                    if (oProduct.Category && aTemp2.indexOf(oProduct.Category) < 0) {
                                        aTemp2.push(oProduct.Category);
                                        aCategoryData.push({Name: oProduct.Category});
                                    }
                                    oProduct.DeliveryDate = (new Date()).getTime() - (i % 10 * 4 * 24 * 60 * 60 * 1000);
                                    oProduct.DeliveryDateStr = oDateFormat.format(new Date(oProduct.DeliveryDate));
                                    oProduct.Heavy = oProduct.WeightMeasure > 1000 ? "true" : "false";
                                    oProduct.Available = oProduct.Status == "Available" ? true : false;
                                }
            
                                oData.Suppliers = aSuppliersData;
                                oData.Categories = aCategoryData;
            
                                oModel.setData(oData);
                            },
                            error: function() {
                                Log.error("failed to load json");
                            }
                        }); 
             */
                        return oModel;
                    },
            
                    updateMultipleSelection: function(oEvent) {
                        var oMultiInput = oEvent.getSource(),
                            sTokensPath = oMultiInput.getBinding("tokens").getContext().getPath() + "/" + oMultiInput.getBindingPath("tokens"),
                            aRemovedTokensKeys = oEvent.getParameter("removedTokens").map(function(oToken) {
                                return oToken.getKey();
                            }),
                            aCurrentTokensData = oMultiInput.getTokens().map(function(oToken) {
                                return {"Key" : oToken.getKey(), "Name" : oToken.getText()};
                            });
            
                        aCurrentTokensData = aCurrentTokensData.filter(function(oToken){
                            return aRemovedTokensKeys.indexOf(oToken.Key) === -1;
                        });
            
                        oMultiInput.getModel().setProperty(sTokensPath, aCurrentTokensData);
                    },
            
                    formatAvailableToObjectState : function(bAvailable) {
                        return bAvailable ? "Success" : "Error";
                    },
            
                    formatAvailableToIcon : function(bAvailable) {
                        return bAvailable ? "sap-icon://accept" : "sap-icon://decline";
                    },
            
                    handleDetailsPress : function(oEvent) {
                        MessageToast.show("Details for product with id " + this.getView().getModel().getProperty("ProductId", oEvent.getSource().getBindingContext()));
                    },
            
                    onPaste: function(oEvent) {
                        var aData = oEvent.getParameter("data");
                        sap.m.MessageToast.show("Pasted Data: " + aData);
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