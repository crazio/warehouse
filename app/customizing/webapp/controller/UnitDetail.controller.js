sap.ui.define(
  [
    "customizing/controller/BaseController",
    "sap/m/MessageToast",
    "../model/models",
  ],
  function (BaseController, MessageToast, models) {
    "use strict";

    return BaseController.extend("customizing.controller.UnitDetail", {
      onInit: function () {
        this.BATCH_GROUP_OBJ_UNIT = "unitObjGroup";
        this.setModel(models.createNewUnitModel(), "newUnit");
        this.getRouter()
          .getRoute("RouteUnitDetail")
          .attachPatternMatched(this._onRouteMatched, this);
      },

      _onRouteMatched: function (oEvent) {
        this._bindUnit(oEvent.getParameter("arguments").code);
        this._setEnabledSaveCancel(false);
      },

      _bindUnit: function (sCode) {
        this.getView().bindElement({
          path: "/Units('" + sCode + "')",
          parameters: {
            $$updateGroupId: this.BATCH_GROUP_OBJ_UNIT,
            events: {
              dataRequested: function () {
                this._setPageBusy(true);
              }.bind(this),
              dataReceived: function () {
                this._setPageBusy(false);
              }.bind(this),
            },
          },
        });
      },

      _resetPendingChanges: function (sGroupId) {
        this.getModel().resetChanges(sGroupId);
      },

      _checkPendingChanges: function () {
        return this.getModel().hasPendingChanges();
      },

      _changeSaveCancelState: function () {
        this._setEnabledSaveCancel(this._checkPendingChanges());
      },

      _setPageBusy: function (bBusy) {
        this.getView().byId("idDetailUnitPage").setBusy(bBusy);
      },

      _setEnabledSaveCancel: function (bEnabled) {
        this.setControlEnabled("idUnitSave", bEnabled);
        this.setControlEnabled("idUnitCancel", bEnabled);
      },

      _setUIBusy: function (bBusy) {
        this._setPageBusy(bBusy);
        this._setEnabledSaveCancel(!bBusy);
      },

      _onSaveSuccess: function () {
        this._setUIBusy(false);
        MessageToast.show(this.getI18Text("saveSuccess"));
        this._changeSaveCancelState();
        this.getModel().refresh();
      },

      _onSaveError: function (oError) {
        this._setUIBusy(false);
        MessageBox.error(oError.message);
      },

      _submitBatch: function () {
        this.getModel()
          .submitBatch(this.BATCH_GROUP_OBJ_UNIT)
          .then(this._onSaveSuccess.bind(this), this._onSaveError.bind(this));
      },

      onUnitDescrChange: function () {
        this._changeSaveCancelState();
      },

      onSave: function () {
        this._setUIBusy(true);
        this._submitBatch();
      },

      onCancel: function () {
        this._resetPendingChanges(this.BATCH_GROUP_OBJ_UNIT);
        this._changeSaveCancelState();
      },

      onUnitInputChange: function () {
        this._changeSaveCancelState();
      },
    });
  }
);
