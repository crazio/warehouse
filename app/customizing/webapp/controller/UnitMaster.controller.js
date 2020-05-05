sap.ui.define(
  [
    "customizing/controller/BaseController",
    "sap/m/MessageBox",
    "sap/ui/core/Fragment",
  ],
  function (BaseController, MessageBox, Fragment) {
    "use strict";

    return BaseController.extend("customizing.controller.UnitMaster", {
      onInit: function () {
        this.BATCH_GROUP_OBJ_UNIT = "unitObjGroup";
        this.getRouter()
          .getRoute("RouteUnitMaster")
          .attachPatternMatched(this._onRouteMatched, this);
      },

      _onRouteMatched: function (_) {
        this._setListItemFirstOrSelected(this.getView().byId("idListUnit"));
      },

      _resetPendingChanges: function (sGroupId) {
        this.getModel().resetChanges(sGroupId);
      },

      _deselectListItems: function () {
        this.getView().byId("idListUnit").removeSelections(true);
      },

      _routeToDetail: function (sCode) {
        this.getRouter().navTo("RouteUnitDetail", {
          code: sCode,
        });
      },

      _getListItemsBinding: function () {
        return this.getView().byId("idListUnit").getBinding("items");
      },

      _checkPendingChanges: function () {
        return this.getModel().hasPendingChanges();
      },

      _setListItemFirstOrSelected: function (oList) {
        if (oList.getItems().length == 0) return;
        var oItem = oList.getSelectedItem() || oList.getItems()[0];
        if (!oItem) return;
        oList.setSelectedItem(oItem);
        this._routeToDetail(oItem.getBindingContext().getProperty("code"));
      },

      _showUnsavedDataDialog: function () {
        MessageBox.show(this.getI18Text("unsavedDataExist"), {
          icon: MessageBox.Icon.WARNING,
          title: this.getI18Text("unsavedDataTitle"),
          actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
          onClose: this._onCloseUnsavedDataDialog.bind(this),
        });
      },

      _onCloseUnsavedDataDialog: function (sAction) {
        if (sAction === MessageBox.Action.OK) {
          this._resetPendingChanges(this.BATCH_GROUP_OBJ_UNIT);
          this._navBack();
        }
      },

      _navBack: function () {
        this._deselectListItems();
        this.getRouter().navTo("RouteMain", true);
      },

      _openNewUnitDialog: function (oDialog) {
        this.getView().addDependent(oDialog);
        oDialog.open();
      },

      onListUpdateFinished: function (oEvent) {
        this._setListItemFirstOrSelected(oEvent.getSource());
      },

      onUnitSelect: function (oEvent) {
        debugger;
        this._routeToDetail(
          oEvent
            .getParameter("listItem")
            .getBindingContext()
            .getProperty("code")
        );
      },

      onNavBack: function () {
        if (this._checkPendingChanges()) {
          this._showUnsavedDataDialog();
        } else {
          this._navBack();
        }
      },

      onAddUnit: function () {
        if (!this.byId("idUnitCreateDialog")) {
          Fragment.load({
            id: this.getView().getId(),
            name: "customizing.fragment.UnitCreate",
            controller: this,
          }).then(this._openNewUnitDialog.bind(this));
        } else {
          this.byId("idUnitCreateDialog").open();
        }
      },

      onCreateUnitPress: function () {},

      onCancelUnitPress: function () {
        this.byId("idUnitCreateDialog").close();
      },
    });
  }
);
