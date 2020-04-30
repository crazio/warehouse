sap.ui.define(["customizing/controller/BaseController"], function (
  BaseController
) {
  "use strict";

  return BaseController.extend("customizing.controller.Main", {
    onInit: function () {
      this._LINK_MAPPER = {
        uomLink: "RouteUnitMaster",
        convLink: "RouteConversion",
        nrLink: "value3",
      };
    },

    _checkLinkName: function (oCustomData) {
      return oCustomData.getKey() === "linkName";
    },

    _getCustomDataLinkName: function (aCustomData) {
      for (var i = 0; i < aCustomData.length; i++) {
        if (this._checkLinkName(aCustomData[i]))
          return aCustomData[i].getValue();
      }
      return null;
    },

    _getLinkTarget: function (sLinkName) {
      return this._LINK_MAPPER[sLinkName];
    },

    onLinkPress: function (oEvent) {
      var sLinkName = this._getCustomDataLinkName(
        oEvent.getSource().getCustomData()
      );
      if (sLinkName) {
        this.getRouter().navTo(this._getLinkTarget(sLinkName));
      }
    },
  });
});
