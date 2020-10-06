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
							<m:Input value="{ProductId}"/>
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
					<Column width="12rem">
						<m:Label text="Supplier" />
						<template>
							<m:ComboBox value="{SupplierName}" items="{/Suppliers}">
								<c:Item text="{Name}"/>
							</m:ComboBox>
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
					<Column width="7rem">
						<m:Label text="Heavy Weight" />
						<template>
							<m:CheckBox selected="{
								path: 'Heavy',
								type: 'sap.ui.model.type.String'
							}"/>
						</template>
					</Column>
					<Column width="12rem">
						<m:Label text="Main Category" />
						<template>
							<m:Select selectedKey="{Category}" items="{/Categories}">
								<c:Item text="{Name}" key="{Name}"/>
							</m:Select>
						</template>
					</Column>
					<Column width="12rem">
						<m:Label text="Additional Categories" />
						<template>
							<m:MultiInput
								tokenUpdate="updateMultipleSelection"
								value="{AdditionalCategory}"
								tokens="{AdditionalCategoriesSelection}"
								suggestionItems="{
									path: '/Categories',
									sorter: { path: 'Name' }
								}"
								showValueHelp="false"
								>
								<m:tokens>
									<m:Token key="{Key}" text="{Name}"/>
								</m:tokens>
								<m:suggestionItems>
									<c:Item key="{ProductId}" text="{Name}" />
								</m:suggestionItems>
							</m:MultiInput>
						</template>
					</Column>
					<Column width="6rem" hAlign="Center">
						<m:Label text="Status" />
						<template>
							<c:Icon src="{
								path: 'Available',
								formatter: '.formatAvailableToIcon'
							}"/>
						</template>
					</Column>
					<Column width="11rem" hAlign="Center">
						<m:Label text="Delivery Date" />
						<template>
							<m:DatePicker value="{
								path: 'DeliveryDate',
								type: 'sap.ui.model.type.Date',
								formatOptions: {source: {pattern: 'timestamp'}}
							}"/>
						</template>
					</Column>
				</columns>
			</Table>
		</m:content>
	</m:Page>
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