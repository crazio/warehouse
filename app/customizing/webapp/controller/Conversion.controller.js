sap.ui.define(
  ["customizing/controller/BaseController", "sap/m/MessageBox"],
  function (BaseController, MessageBox) {
    "use strict";

    return BaseController.extend("customizing.controller.Conversion", {
      onInit: function () {
        this.getRouter()
          .getRoute("RouteConversion")
          .attachPatternMatched(this._onRouteMatched, this);
      },

      _onRouteMatched: function () {
        this._setEnabledSaveCancel(false);
      },

      _resetPendingChanges: function (sGroupId) {
        this.getModel().resetChanges(sGroupId);
      },

      _checkPendingChanges: function () {
        return this.getModel().hasPendingChanges();
      },

      _setEnabledSaveCancel: function (bEnabled) {
        this.getView().byId("idConvSave").setEnabled(bEnabled);
        this.getView().byId("idConvCancel").setEnabled(bEnabled);
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
          this._resetPendingChanges("conversionGroup");
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
        }
      },

      onInputValueChange: function (_) {
        this._changeSaveCancelState();
      },

      onAddPress: function () {},

      onDeletePress: function () {},

      onCancelPress: function () {},

      onSavePress: function () {},
    });
  }
);
