sap.ui.define(
  [
    "customizing/controller/BaseController",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
  ],
  function (BaseController, MessageBox, MessageToast) {
    "use strict";

    return BaseController.extend("customizing.controller.Conversion", {
      onInit: function () {
        this.BATCH_GROUP_CONV = "convGroup";
        this.getRouter()
          .getRoute("RouteConversion")
          .attachPatternMatched(this._onRouteMatched, this);
      },

      _onRouteMatched: function () {
        this._setEnabledSaveCancel(false);
      },

      _getTableRowsBinding: function () {
        return this.getView().byId("idConvTable").getBinding("rows");
      },

      _setControlBusyById: function (sControl, bBusy) {
        this.getView().byId(sControl).setBusy(bBusy);
      },

      _onConvSaveSuccess: function () {
        this._setUIBusy(false);
        MessageToast.show(this.getI18Text("saveSuccess"));
        this._changeSaveCancelState();
        this._getTableRowsBinding().refresh();
      },

      _onConvSaveError: function (oError) {
        this._setUIBusy(false);
        MessageBox.error(oError.message);
      },

      _submitBatch: function () {
        this.getModel()
          .submitBatch(this.BATCH_GROUP_CONV)
          .then(
            this._onConvSaveSuccess.bind(this),
            this._onConvSaveError.bind(this)
          );
      },

      _setButtonsEnabled: function (bEnabled) {
        this.setControlEnabled("idConvAdd", bEnabled);
        this.setControlEnabled("idConvDelete", bEnabled);
        this.setControlEnabled("idConvSave", bEnabled);
        this.setControlEnabled("idConvCancel", bEnabled);
      },

      _setUIBusy: function (bBusy) {
        this._setControlBusyById("idConvTable", bBusy);
        this._setButtonsEnabled(!bBusy);
      },

      _resetPendingChanges: function (sGroupId) {
        this.getModel().resetChanges(sGroupId);
      },

      _checkPendingChanges: function () {
        return this.getModel().hasPendingChanges();
      },

      _setEnabledSaveCancel: function (bEnabled) {
        this.setControlEnabled("idConvSave", bEnabled);
        this.setControlEnabled("idConvCancel", bEnabled);
      },

      _changeSaveCancelState: function () {
        this._setEnabledSaveCancel(this._checkPendingChanges());
      },

      _checkEqualUnits: function (oContext) {
        return (
          oContext.getProperty("unitFrom") === oContext.getProperty("unitTo")
        );
      },

      _setValueStateText: function (oControl, s18nText) {
        oControl.setValueStateText(this.getI18Text(s18nText));
      },

      _setErrorState: function (oControl, bError) {
        var valueState = bError
          ? sap.ui.core.ValueState.Error
          : sap.ui.core.ValueState.None;
        oControl.setValueState(valueState);
      },

      _setControlToError: function (oControl, bError, s18nText) {
        this._setErrorState(oControl, bError);
        this._setValueStateText(oControl, s18nText);
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
          this._resetPendingChanges(this.BATCH_GROUP_CONV);
          BaseController.prototype.onNavBack.call(this);
        }
      },

      onUnitSelection: function (oEvent) {
        var oComboBox = oEvent.getSource();
        this._setControlToError(
          oComboBox,
          this._checkEqualUnits(oComboBox.getBindingContext()),
          "sameUnitError"
        );
        this._changeSaveCancelState();
      },

      onNavBack: function () {
        if (this._checkPendingChanges()) {
          this._showUnsavedDataDialog();
        } else {
          BaseController.prototype.onNavBack.call(this);
        }
      },

      onInputValueChange: function () {
        this._changeSaveCancelState();
      },

      onAddPress: function () {
        var oBinding = this._getTableRowsBinding();
        oBinding.create({
          unitFrom: "",
          unitTo: "",
          numerator: 0,
          denominator: 0,
        });
        this._setEnabledSaveCancel();
      },

      onDeletePress: function () {
        var oTable = this.getView().byId("idConvTable");
        $.each(oTable.getSelectedIndices().reverse(), function (
          _,
          iContextIndex
        ) {
          oTable.getContextByIndex(iContextIndex).delete();
        });
        oTable.setSelectedIndex(-1);
      },

      onCancelPress: function () {
        this._resetPendingChanges(this.BATCH_GROUP_CONV);
        this._changeSaveCancelState();
      },

      onSavePress: function () {
        this._setUIBusy(true);
        this._submitBatch();
      },
    });
  }
);
