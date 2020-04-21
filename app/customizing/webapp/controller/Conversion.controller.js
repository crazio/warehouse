sap.ui.define(["customizing/controller/BaseController"], function (
  BaseController
) {
  "use strict";

  return BaseController.extend("customizing.controller.Conversion", {
    _checkEqualUnits: function (oContext) {
      return (
        oContext.getProperty("unitFrom") === oContext.getProperty("unitTo")
      );
    },

    _setValueStateText: function (oControl, s18nText) {
      oControl.oComboBox.setValueStateText();
    },

    _setErrorState: function (oControl, bError, s18nText) {
      if (bError) {

      }
    },

    onUnitSelection: function (oEvent) {
      var oComboBox = oEvent.getSource();
      if (this._checkEqualUnits(oComboBox.getBindingContext())) {
        oComboBox.setValueState(sap.ui.core.ValueState.Error);
        oComboBox.setValueStateText("The same units are not allowed");
      }
      else {
        
      }
    },
  });
});
