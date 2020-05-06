sap.ui.define(["customizing/controller/BaseController"], function (
  BaseController
) {
  "use strict";

  return BaseController.extend("customizing.controller.NumberRange", {

	_setRowEditMode: function (bEditable) {
		
	},

    onNumberRangeEdit: function (oEvent) {
      var oButtonContainer = oEvent.getSource().getParent();
      var oRow = oButtonContainer.getParent();
    },

    onNumberRangeSave: function (oEvent) {},

    onNumberRangeCancel: function (oEvent) {},

    onNumberRangeDelete: function (oEvent) {},

    onNumberRangeAdd: function (oEvent) {},

    onNumberRangeRemoveAll: function (oEvent) {},
  });
});
