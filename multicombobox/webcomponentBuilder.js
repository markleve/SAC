(function() {

    let _id;

	let template = document.createElement("template");
	template.innerHTML = `
    <script>

	function pressHandler(oEvent) {
		var bCellClick = oEvent.getId() === "cellClick";
		jQuery.sap.log.warning((bCellClick ? "Cell" : oEvent.getSource().getMetadata().getName()) + " pressed");
		if (!bCellClick) {
			oEvent.preventDefault();
		}
	}

	var oTable = new sap.ui.table.Table({
		title: "Title of the Table",
		footer: "Footer of the Table",
		visibleRowCountMode: "Auto",
		firstVisibleRow: 1
	});

	oTable.setToolbar(new sap.m.Toolbar({
		content: [
			new sap.m.Button({
				text: "First Toolbar Button",
				press: function() {
					sap.m.MessageToast.show("Pressed");
				}
			}),
			new sap.m.Button({
				text: "Second Toolbar Button",
				press: function() {
					sap.m.MessageToast.show("Pressed");
				}
			})
		]
	}));

	// create columns
	var oControl, oColumn;

	// sap.m.Text
	oControl = new sap.m.Text({text: "{lastName}", wrapping: false});
	oColumn = new sap.ui.table.Column(
			{label: new sap.m.Text({text: "m.Text"}), template: oControl, sortProperty: "lastName", filterProperty: "lastName", width: "120px"});
	oColumn.setCreationTemplate(new sap.m.Input({value: "{lastName}"}));
	oTable.addColumn(oColumn);

	// sap.m.Label
	oControl = new sap.m.Label({text: "{name}"});
	oColumn = new sap.ui.table.Column(
			{label: new sap.m.Label({text: "m.Label"}), template: oControl, sortProperty: "name", filterProperty: "name", width: "6em"});
	oColumn.setCreationTemplate(new sap.m.Input({value: "{name}"}));
	oTable.addColumn(oColumn);

	// sap.m.ObjectStatus
	oControl = new sap.m.ObjectStatus({text: "{objStatusText}", state: "{objStatusState}"});
	oColumn = new sap.ui.table.Column({
		label: new sap.m.Label({text: "m.ObjectStatus"}),
		template: oControl,
		sortProperty: "objStatusState",
		filterProperty: "objStatusState",
		width: "200px"
	});
	oTable.addColumn(oColumn);

	// sap.ui.core.Icon
	oControl = new sap.ui.core.Icon({src: "sap-icon://account", decorative: false});
	oColumn = new sap.ui.table.Column({
		resizable: false,
		label: new sap.m.Label({text: "core.Icon"}),
		template: oControl,
		width: "80px",
		hAlign: sap.ui.core.HorizontalAlign.Center
	});
	oTable.addColumn(oColumn);

	// sap.m.Button
	oControl = new sap.m.Button({text: "{gender}", press: pressHandler});
	oColumn = new sap.ui.table.Column({label: new sap.m.Label({text: "m.Button"}), template: oControl, width: "100px"});
	oTable.addColumn(oColumn);

	// sap.m.Input
	oControl = new sap.m.Input({value: "{name}"});
	oColumn = new sap.ui.table.Column({label: new sap.m.Label({text: "m.Input"}), template: oControl, width: "200px"});
	oColumn.setCreationTemplate(new sap.m.Text({text: "{name}"}));
	oTable.addColumn(oColumn);

	// sap.m.DatePicker
	oControl = new sap.m.DatePicker({dateValue: "{birthdayDate}"});
	oColumn = new sap.ui.table.Column({label: new sap.m.Label({text: "m.DatePicker"}), template: oControl, width: "200px"});
	oColumn.setCreationTemplate(new sap.m.DatePicker({dateValue: "{birthdayDate}"}));
	oTable.addColumn(oColumn);

	// sap.m.Select
	oControl = new sap.m.Select({
		items: [
			new sap.ui.core.Item({key: "v1", text: "Value 1"}),
			new sap.ui.core.Item({key: "v2", text: "Value 2"}),
			new sap.ui.core.Item({key: "v3", text: "Value 3"}),
			new sap.ui.core.Item({key: "v4", text: "Value 4"})
		]
	});
	oColumn = new sap.ui.table.Column({label: new sap.m.Label({text: "m.Select"}), template: oControl, width: "150px"});
	oColumn.setCreationTemplate((new sap.m.Select({items: oControl.getItems().map(function(oItem) {return oItem.clone();})})));
	oTable.addColumn(oColumn);

	// sap.m.ComboBox
	oControl = new sap.m.ComboBox({
		items: [
			new sap.ui.core.Item({key: "v1", text: "Value 1"}),
			new sap.ui.core.Item({key: "v2", text: "Value 2"}),
			new sap.ui.core.Item({key: "v3", text: "Value 3"}),
			new sap.ui.core.Item({key: "v4", text: "Value 4"})
		]
	});
	oColumn = new sap.ui.table.Column({label: new sap.m.Label({text: "m.ComboBox"}), template: oControl, width: "150px"});
	oTable.addColumn(oColumn);

	// sap.m.MultiComboBox
	oControl = new sap.m.MultiComboBox({
		items: [
			new sap.ui.core.Item({key: "v1", text: "Value 1"}),
			new sap.ui.core.Item({key: "v2", text: "Value 2"}),
			new sap.ui.core.Item({key: "v3", text: "Value 3"}),
			new sap.ui.core.Item({key: "v4", text: "Value 4"})
		]
	});
	oColumn = new sap.ui.table.Column({label: new sap.m.Label({text: "m.MultiComboBox"}), template: oControl, width: "250px"});
	oTable.addColumn(oColumn);

	// sap.m.Checkbox
	oControl = new sap.m.CheckBox({selected: "{checked}", text: "{lastName}"});
	oColumn = new sap.ui.table.Column({label: new sap.m.Label({text: "m.Checkbox"}), template: oControl, width: "50px"});
	oColumn.setCreationTemplate(new sap.m.HBox({items: [new sap.m.CheckBox({selected: "{checked}"}), new sap.m.Input({value: "{lastName}"})]}));
	oTable.addColumn(oColumn);

	//sap.m.RadioButton
	//RadioButton makes no sense in the table because to work correctly all radio buttons must be available otherwise the group feature
	//will not work correctly. Radio Button without groups makes not really sense (except of readonly) because the state cannot be changed.
	/*oControl = new sap.m.RadioButton({selected: "{checked}", text: "{lastName}", groupName: ""});
	oColumn = new sap.ui.table.Column({label: new sap.m.Label({text: "m.RadioButton"}), template: oControl, width: "50px"});
	oTable.addColumn(oColumn);*/

	// sap.m.Link
	oControl = new sap.m.Link({href: "{href}", text: "{linkText}", press: pressHandler});
	oColumn = new sap.ui.table.Column({label: new sap.m.Label({text: "m.Link"}), template: oControl, width: "150px"});
	oTable.addColumn(oColumn);

	// sap.ui.unified.Currency
	oControl = new sap.ui.unified.Currency({value: "{money}", currency: "{currency}"});
	oColumn = new sap.ui.table.Column({label: new sap.m.Label({text: "unified.Currency"}), template: oControl, width: "200px"});
	oTable.addColumn(oColumn);

	//sap.m.ProgressIndicator
	oControl = new sap.m.ProgressIndicator({
		percentValue: {
			path: "lastName", formatter: function(sValue) {
				sValue = sValue || "";
				return (sValue.length * 10) % 100;
			}
		}
	});
	oColumn = new sap.ui.table.Column({label: new sap.m.Label({text: "m.ProgressIndicator"}), template: oControl, width: "150px"});
	oTable.addColumn(oColumn);

	//sap.m.RatingIndicator
	oControl = new sap.m.RatingIndicator({
		value: {
			path: "lastName", formatter: function(sValue) {
				sValue = sValue || "";
				return sValue.length % 5;
			}
		}
	});
	oColumn = new sap.ui.table.Column({label: new sap.m.Label({text: "m.RatingIndicator"}), template: oControl, width: "200px"});
	oTable.addColumn(oColumn);

	//sap.m.HBox with sap.m.Link || sap.m.Text
	oControl = new sap.m.HBox({
		width: "100%", items: [
			new sap.m.Link({visible: "{checked}", href: "{href}", text: "{linkText}"}),
			new sap.m.Text({text: "{linkText}", wrapping: false, visible: {path: "checked", formatter: function(bChecked) {return !bChecked;}}})
		]
	});
	oColumn = new sap.ui.table.Column({
		visible: "{flex>/flex}",
		label: new sap.m.Label({text: "m.HBox with Link and Text (partially hidden)"}),
		template: oControl,
		width: "200px"
	});
	oTable.addColumn(oColumn);

	//sap.m.HBox with sap.m.Link && sap.m.Text
	oControl = new sap.m.HBox({
		width: "100%", items: [
			new sap.m.Link({href: "{href}", text: "{href}"}),
			new sap.m.Text({text: "{linkText}", wrapping: false})
		]
	});
	oColumn = new sap.ui.table.Column(
			{visible: "{flex>/flex}", label: new sap.m.Label({text: "m.HBox with Link and Text"}), template: oControl, width: "400px"});
	oTable.addColumn(oColumn);

	//sap.m.HBox with 2 sap.m.Button
	oControl = new sap.m.HBox({
		width: "100%", items: [
			new sap.m.Button({text: "{gender}"}),
			new sap.m.Button({text: "{gender}"})
		]
	});
	oColumn = new sap.ui.table.Column(
			{visible: "{flex>/flex}", label: new sap.m.Label({text: "m.HBox with 2 Buttons"}), template: oControl, width: "200px"});
	oTable.addColumn(oColumn);

	//sap.m.HBox with 2 sap.m.Input
	oControl = new sap.m.HBox({
		width: "100%", items: [
			new sap.m.Input({value: "{name}"}),
			new sap.m.Input({value: "{name}"})
		]
	});
	oColumn = new sap.ui.table.Column(
			{visible: "{flex>/flex}", label: new sap.m.Label({text: "m.HBox with 2 Inputs"}), template: oControl, width: "200px"});
	oTable.addColumn(oColumn);

	// set Model and bind Table
	var oModel = new sap.ui.model.json.JSONModel();
	oModel.setData({modelData: TABLESETTINGS.listTestData});
	oTable.setModel(oModel);

	var oFlexModel = new sap.ui.model.json.JSONModel();
	oFlexModel.setData({flex: false});
	oTable.setModel(oFlexModel, "flex");

	function showFlexBoxColumns() {
		oFlexModel.setProperty("/flex", true);
	}

	TABLESETTINGS.init(oTable, function(oButton) {
		oTable.getToolbar().addContent(oButton);
	});

	var oBindingInfo = oTable.getBindingInfo("rows");

	function rebind() {
		oTable.bindRows(oBindingInfo || {path: "/modelData"});
	}

	function unbind() {
		oTable.unbindRows();
	}

	var bBindTable = jQuery.sap.getUriParameters().get("sap-ui-xx-table-bind") !== "false";
	if (bBindTable) {
		rebind();
	}

	var oTestLayoutToolbar = new sap.m.Toolbar({
		content: [
			new sap.m.Label({text: "VBox RenderType"}),
			new sap.m.Select({
				width: "100px",
				items: [
					new sap.ui.core.Item({key: "Bare", text: "Bare"}),
					new sap.ui.core.Item({key: "Div", text: "Div"})
				],
				selectedKey: "Div",
				change: function(oEvent) {
					var oItem = oEvent.getParameters().selectedItem;
					oVBox.setRenderType(oItem.getKey());
				}
			}),
			new sap.m.CheckBox({
				text: "Show Borders",
				select: function(oEvent) {
					var bSelected = oEvent.getParameters().selected;
					if (bSelected) {
						oVBox.addStyleClass("vboxborder");
					} else {
						oVBox.removeStyleClass("vboxborder");
					}
				}
			})
		]
	});

	var oVBox = new sap.m.VBox({
		width: "100%",
		items: [
			oTestLayoutToolbar,
			oTable.setLayoutData(new sap.m.FlexItemData({growFactor: 1})),
			new sap.m.Button({text: "Just a Button after"})
		]
	}).placeAt("content");

</script>         
	`;

	class MulticomboBoxBuilder extends HTMLElement {
		constructor() {
			super();
			this._shadowRoot = this.attachShadow({mode: "open"});
            this._shadowRoot.appendChild(template.content.cloneNode(true));

            _id = createGuid();
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
            var that = this;
            buildTable(that);

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

    /* sap.ui.getCore().attachInit(function () {
        "use strict";

        //### Controller ###
        sap.ui.define("nameOfController", [
            "jquery.sap.global",
            "sap/ui/core/mvc/Controller",
            "sap/ui/model/json/JSONModel"
        ], function (jQuery, Controller, JSONModel) {
            "use strict";

            return Controller.extend("myView.Template");
        });
        //### THE APP: place the XMLView somewhere into DOM ###
        var oView = new sap.ui.jsview("myView.Template", {


            /** Specifies the Controller belonging to this View. 
            * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
            * @memberOf maintplan.PlannedKm.view.kmTable
            */
/*             getControllerName: function () {
                console.log("in oView, getControllerName")
                return "nameOfController";
            },
 */
            /** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
             * Since the Controller is given to this method, its event handlers can be attached right away. 
             * @memberOf maintplan.PlannedKm.view.kmTable
             */
/*             createContent: function (oController) { */

                /* var table = new sap.ui.table.Table({
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
                return table; */

/*                 var MultiCompboBox = new sap.m.MultiCompboBox({
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
                });
                return MultiCompboBox; */

/*             } 
        });

        oView.placeAt(content); */
/*     });  */ 
}

function createGuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
        let r = Math.random() * 16 | 0,
            v = c === "x" ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
} 

})();