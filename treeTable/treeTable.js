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
        xmlns:m="sap.m"
        xmlns:u="sap.ui.unified"
        xmlns:core="sap.ui.core"
        height="100%">
    <m:Page
            showHeader="false"
            enableScrolling="false">
        <m:content>
            <TreeTable
                    id="TreeTableBasic"
                    rows="{path:'/catalog/clothing', parameters: {arrayNames:['categories']}}"
                    selectionMode="MultiToggle"
                    enableSelectAll="false"
                    ariaLabelledBy="title">
                <extension>
                    <m:OverflowToolbar>
                        <m:Title id="title" text="Clothing"/>
                        <m:ToolbarSpacer/>
                        <m:Button text="Collapse all" press="onCollapseAll"/>
                        <m:Button text="Collapse selection" press="onCollapseSelection"/>
                        <m:Button text="Expand first level" press="onExpandFirstLevel"/>
                        <m:Button text="Expand selection" press="onExpandSelection"/>
                    </m:OverflowToolbar>
                </extension>
                <columns>
                    <Column width="13rem">
                        <m:Label text="Categories"/>
                        <template>
                            <m:Text text="{name}" wrapping="false" />
                        </template>
                    </Column>
                    <Column width="9rem">
                        <m:Label text="Price"/>
                        <template>
                            <u:Currency value="{amount}" currency="{currency}"/>
                        </template>
                    </Column>
                    <Column width="11rem">
                        <m:Label text="Size"/>
                        <template>
                            <m:Select
                                    items="{path: '/sizes', templateShareable: true}"
                                    selectedKey="{size}"
                                    forceSelection="false">
                                <core:Item key="{key}" text="{value}"/>
                            </m:Select>
                        </template>
                    </Column>
                </columns>
            </TreeTable>
        </m:content>
    </m:Page>
</mvc:View>
        </script> 
    `;

    customElements.define('com-sap-sample-mk-treetable', class WidgetTemplate extends HTMLElement {


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
                "sap/ui/core/mvc/Controller",
                "sap/ui/model/json/JSONModel"
                ], function(Controller, JSONModel) {
                "use strict";
        
                return Controller.extend("myView.Template", {
        
                    onInit: function () {
                        // set explored app's demo model on this sample
                        var oModel = new JSONModel("http://localhost:8000/Clothing.json");
                        this.getView().setModel(oModel);
                        sap.ui.getCore().setModel(oModel);
                    },

                    onAfterRendering: function() {
/*                         this.addClass("myStyle"); */
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