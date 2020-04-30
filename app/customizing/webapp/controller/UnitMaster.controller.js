sap.ui.define(["customizing/controller/BaseController"], function (
  BaseController
) {
  "use strict";

  return BaseController.extend("customizing.controller.UnitMaster", {
    onListUpdateFinished: function (oEvent) {
      var oList = oEvent.getSource();
      if (oList.getItems().length == 0) return;
      oList.setSelectedItem(oList.getSelectedItem() || oList.getItems()[0]);
    },

    onUnitSelect: function (oEvent) {
      var oContext = oEvent.getParameter("listItem").getBindingContext();
      debugger;
      this.getRouter().navTo("RouteUnitDetail", {
        code: oContext.getProperty("code")
      });
    },

    onNavBack: function (_) {
      this.getRouter().navTo("RouteMain", true);
    },
  });
});
