sap.ui.define(
  [
    "customizing/controller/BaseController",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment",
    "../model/models",
  ],
  function (BaseController, MessageBox, MessageToast, Fragment, models) {
    "use strict";

    return BaseController.extend("customizing.controller.UnitMaster", {
      onInit: function () {
        this.BATCH_GROUP_LIST_UNIT = "unitListGroup";
        this.setModel(models.createNewUnitModel(), "newUnit");
        this.getRouter()
          .getRoute("RouteUnitMaster")
          .attachPatternMatched(this._onRouteMatched, this);
      },

      _setPageBusy: function (bBusy) {
        this.getView().byId("idUnitMasterPage").setBusy(bBusy);
      },

      _setUIBusy: function (bBusy) {
        this._setPageBusy(bBusy);
      },

      _onRouteMatched: function () {
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
        if (!oItem || !oItem.getBindingContext().getProperty("code")) return;
        oList.setSelectedItem(oItem);
        this._routeToDetail(oItem.getBindingContext().getProperty("code"));
      },

      _showConfirmDialog: function (
        sMsg,
        sIcon,
        sTitle,
        aActions,
        fnOnClose,
        bI18nTexts
      ) {
        MessageBox.show(bI18nTexts ? this.getI18Text(sMsg) : sMsg, {
          icon: sIcon,
          title: bI18nTexts ? this.getI18Text(sTitle) : sTitle,
          actions: aActions,
          onClose: fnOnClose.bind(this),
        });
      },

      _onCloseUnsavedDataDialog: function (sAction) {
        if (sAction === MessageBox.Action.OK) {
          this._resetPendingChanges(this.BATCH_GROUP_OBJ_UNIT);
          this._navBack();
        }
      },

      _onDeleteUnitSuccess: function () {
        MessageToast.show(this.getI18Text("deleteSuccessfull"));
      },

      _onDeleteUnitError: function (oError) {
        MessageBox.error(oError.message);
      },

      _onCloseDeleteUnitDialog: function () {
        this._getSelectedItem()
          .getBindingContext()
          .delete("$auto")
          .then(this._onDeleteUnitSuccess.bind(this), this._onDeleteUnitError.bind(this));
      },

      _navBack: function () {
        this._deselectListItems();
        this.getRouter().navTo("RouteMain", true);
      },

      _openNewUnitDialog: function (oDialog) {
        this.getView().addDependent(oDialog);
        oDialog.open();
      },

      _onUnitCreateSuccess: function () {
        this._setUIBusy(false);
        MessageToast.show(this.getI18Text("unitCreated"));
        this.getModel().refresh();
      },

      _onUnitCreateError: function (oError) {
        this._setUIBusy(false);
        MessageBox.error(oError.message);
      },

      _submitBatch: function () {
        this.getModel()
          .submitBatch(this.BATCH_GROUP_LIST_UNIT)
          .then(
            this._onUnitCreateSuccess.bind(this),
            this._onUnitCreateError.bind(this)
          );
      },

      _resetNewUnitValues: function () {
        var oModel = this.getView().getModel("newUnit");
        $.each(Object.keys(oModel.getData()), function (_, key) {
          oModel.setProperty("/" + key, "");
        });
      },

      onNewUnitInputChange: function (oEvent) {
        var oInput = oEvent.getSource();
        oInput.setValue(oInput.getValue().toUpperCase());
      },

      onListUpdateFinished: function (oEvent) {
        this._setListItemFirstOrSelected(oEvent.getSource());
      },

      _getSelectedItem: function () {
        return this.getView().byId("idListUnit").getSelectedItem();
      },

      onUnitSelect: function (oEvent) {
        this._resetPendingChanges("unitObjGroup");
        this._routeToDetail(
          oEvent
            .getParameter("listItem")
            .getBindingContext()
            .getProperty("code")
        );
      },

      onNavBack: function () {
        if (this._checkPendingChanges()) {
          this._showConfirmDialog(
            "unsavedDataExist",
            MessageBox.Icon.WARNING,
            "unsavedDataTitle",
            [MessageBox.Action.OK, MessageBox.Action.CANCEL],
            this._onCloseUnsavedDataDialog,
            true
          );
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

      onCreateUnitPress: function () {
        var oData = this.getView().getModel("newUnit").getData();
        this._getListItemsBinding().create(oData);
        this._setUIBusy(true);
        this._submitBatch(this.BATCH_GROUP_LIST_UNIT);
        this._resetNewUnitValues();
        this.byId("idUnitCreateDialog").close();
      },

      onDeleteUnit: function () {
        this._showConfirmDialog(
          this.getI18Text("wantToDeleteText") +
            " " +
            this._getSelectedItem().getBindingContext().getProperty("code"),
          MessageBox.Icon.WARNING,
          this.getI18Text("deleteUoMTitle"),
          [MessageBox.Action.OK, MessageBox.Action.CANCEL],
          this._onCloseDeleteUnitDialog,
          false
        );
      },

      onCancelUnitPress: function () {
        this.byId("idUnitCreateDialog").close();
      },
    });
  }
);
