sap.ui.define(["customizing/controller/BaseController"], function (
  BaseController
) {
  "use strict";

  return BaseController.extend("customizing.controller.UnitMaster", {
    onInit: function () {
      this.getRouter()
        .getRoute("RouteUnitMaster")
        .attachPatternMatched(this._onRouteMatched, this);
    },

    _onRouteMatched: function (_) {
      this._setListItemFirstOrSelected(this.getView().byId("idListUnit"));
    },

    _deselectListItems: function () {
      this.getView().byId("idListUnit").removeSelections(true);
    },

    _routeToDetail: function (sCode) {
      this.getRouter().navTo("RouteUnitDetail", {
        code: sCode,
      });
    },

    _setListItemFirstOrSelected: function (oList) {
      if (oList.getItems().length == 0) return;
      var oItem = oList.getSelectedItem() || oList.getItems()[0];
      if (!oItem) return;
      oList.setSelectedItem(oItem);
      this._routeToDetail(oItem.getBindingContext().getProperty("code"));
    },

    onListUpdateFinished: function (oEvent) {
      this._setListItemFirstOrSelected(oEvent.getSource());
    },

    onUnitSelect: function (oEvent) {
      this._routeToDetail(
        oEvent.getParameter("listItem").getBindingContext().getProperty("code")
      );
    },

    onNavBack: function (_) {
      this._deselectListItems();
      this.getRouter().navTo("RouteMain", true);
    },
  });
});
