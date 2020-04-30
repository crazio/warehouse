sap.ui.define(["customizing/controller/BaseController"], function (
  BaseController
) {
  "use strict";

  return BaseController.extend("customizing.controller.UnitDetail", {
    onInit: function () {
      this.getRouter()
        .getRoute("RouteUnitDetail")
        .attachPatternMatched(this._onRouteMatched, this);
    },

    _onRouteMatched: function (oEvent) {
      var code = oEvent.getParameter("arguments").code;
    },
  });
});
