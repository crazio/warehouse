sap.ui.define(["customizing/controller/BaseController"], function (
  BaseController
) {
  "use strict";

  return BaseController.extend("customizing.controller.UnitDetail", {
    onInit: function () {
      this.BATCH_GROUP_UNIT = "unitGroup";
      this.getRouter()
        .getRoute("RouteUnitDetail")
        .attachPatternMatched(this._onRouteMatched, this);
    },

    _setPageBusy: function (bBusy) {
      this.getView().byId("idDetailUnitPage").setBusy(bBusy);
    },

    _onRouteMatched: function (oEvent) {
      this.getView().bindElement({
        path: "/Units('" + oEvent.getParameter("arguments").code + "')",
        parameters: {
          $$updateGroupId: this.BATCH_GROUP_UNIT,
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
  });
});
