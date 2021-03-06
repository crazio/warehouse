sap.ui.define(["sap/ui/model/json/JSONModel"], function (JSONModel) {
  "use strict";

  return {
    createNewUnitModel: function () {
      var oModel = new JSONModel({
        code: "",
        name: "",
        descr: "",
      });
      oModel.setDefaultBindingMode("TwoWay");
      return oModel;
    },

    createEditNumberRangeRowModel: function () {
      var oModel = new JSONModel({
        id: "",
      });
      oModel.setDefaultBindingMode("TwoWay");
      return oModel;
    },
  };
});
