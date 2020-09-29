(function(){
    let _shadowRoot;
    let _id;

	let template = document.createElement("template");
	template.innerHTML = `
        <style>
        </style>
        <div id="ui5_content" name="ui5_content">
            <slot name="content"></slot>
        </div>

        <script id="oView" name="oView" type="sapui5/xmlview">
            <mvc:View
                height="100%"
                controllerName="sap.m.sample.MultiComboBox.controller.MultiComboBox"
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
                        items="{
                            path: '/ProductCollection',
                            sorter: { path: 'Name' }
                        }">
                        <core:Item key="{ProductId}" text="{Name}"/>
                    </MultiComboBox>
                </l:VerticalLayout>
            </mvc:View>
        </script>
    `;
    
    customElements.define('com-sap-sample-mk-multicombobox', class MultiComboBox extends HTMLElement {
		constructor() {
            super();
            
            _shadowRoot = this.attachShadow({ mode: "open" });
            
			_shadowRoot.appendChild(template.content.cloneNode(true));
			//_shadowRoot.getElementById("form").addEventListener("submit", this._submit.bind(this));
        
            _id = createGuid();

            _shadowRoot.querySelector('#oView').id = _id + "oView";

            //add event listner??
        }

        onCustomWidgetBeforeUpdate(changedProperties) {
			this._props = { ...this._props, ...changedProperties };
		}

		onCustomWidgetAfterUpdate(changedProperties) {
			var that = this;
			loadUiElement(that);
		}
    });

    //customElements.define("com-sap-sample-multicombobox-styling", MultiComboBox);
    
    function loadUiElement(that) {
        var that_ = that;

        let content = document.createElement('div');
        content.slot = "content";
        that_.appendChild(content);

        sap.ui.getCore().attachInit(function() {

            sap.ui.define([
                'sap/m/MessageToast',
                'sap/ui/core/mvc/Controller',
                'sap/ui/model/json/JSONModel'
            ], function(MessageToast, Controller, JSONModel) {
            "use strict";
        
            return Controller.extend("myView.Template", {
        
                onInit: function () {
                    // set explored app's demo model on this sample
                    var oModel = new JSONModel(sap.ui.require.toUrl("sap/ui/demo/mock/products.json"));
                    this.getView().setModel(oModel);
                },
        
        
                handleSelectionChange: function(oEvent) {
                    var changedItem = oEvent.getParameter("changedItem");
                    var isSelected = oEvent.getParameter("selected");
        
                    var state = "Selected";
                    if (!isSelected) {
                        state = "Deselected";
                    }
        
                    MessageToast.show("Event 'selectionChange': " + state + " '" + changedItem.getText() + "'", {
                        width: "auto"
                    });
                },
        
                handleSelectionFinish: function(oEvent) {
                    var selectedItems = oEvent.getParameter("selectedItems");
                    var messageText = "Event 'selectionFinished': [";
        
                    for (var i = 0; i < selectedItems.length; i++) {
                        messageText += "'" + selectedItems[i].getText() + "'";
                        if (i != selectedItems.length - 1) {
                            messageText += ",";
                        }
                    }
        
                    messageText += "]";
        
                    MessageToast.show(messageText, {
                        width: "auto"
                    });
                }
            });
        });

        });

        //The app: place the XMLView somewhere into DOM
        //var oView = sap.ui.xmlview({
        //    viewContent: jQuery(_shadowRoot.getElementById(_id + "_oView")).html(),
        //});
        //oView.placeAt(content);

        //if(that_._designMode){
        //    oView.byId("").setEnabled(false);
        //}

        var oView = sap.ui.jsview("myView.Template", {

        });
        oView.placeAt(content);
    }

    function createGuid() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
            let r = Math.random() * 16 | 0,
                v = c === "x" ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }  

})();