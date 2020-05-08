sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/m/MessageToast",
  ],
  function (Controller, History) {
    "use strict";

    return Controller.extend("customizing.controller.BaseController", {
      onNavBack: function () {
        var oHistory = History.getInstance(),
          sPreviousHash = oHistory.getPreviousHash();
        if (sPreviousHash !== undefined) {
          window.history.go(-1);
        } else {
          this.getRouter().navTo("RouteMain", true);
        }
      },

      getModel: function (sModel) {
        return this.getOwnerComponent().getModel(sModel);
      },

      getRouter: function () {
        return this.getOwnerComponent().getRouter();
      },

      setModel: function (oModel, sName) {
        return this.getView().setModel(oModel, sName);
      },

      getResourceBundle: function () {
        return this.getOwnerComponent().getModel("i18n").getResourceBundle();
      },

      getI18Text: function (sTextKey, aParams) {
        return this.getResourceBundle().getText(sTextKey, aParams);
      },

      setControlEnabled: function (sControl, bEnabled) {
        this.getView().byId(sControl).setEnabled(bEnabled);
      },
    });
  }
);
