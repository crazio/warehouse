sap.ui.define(
  [
    "customizing/controller/BaseController",
    "../model/models",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
  ],
  function (BaseController, models, MessageBox, MessageToast) {
    "use strict";

    return BaseController.extend("customizing.controller.NumberRange", {
      onInit: function () {
        this.BATCH_GROUP_NR = "nrGroup";
        this.setModel(models.createEditNumberRangeRowModel(), "editRow");
      },

      _getEditRowModel: function () {
        return this.getView().getModel("editRow");
      },

      _initEditRowModel: function () {
        var oModel = this.getView().getModel("editRow");
        $.each(Object.keys(oModel.getData()), function (_, key) {
          oModel.setProperty("/" + key, "");
        });
      },

      _resetPendingChanges: function (sGroupId) {
        this.getModel().resetChanges(sGroupId);
      },

      _getNumberRangeTable: function () {
        return this.getView().byId("idNumberRangeTable");
      },

      _setUIBusy: function (bBusy) {
        this._getNumberRangeTable().setBusy(bBusy);
      },

      _filterByCustomData: function (aControls, key, value) {
        return $.grep(aControls, function (oControl) {
          return (
            $.grep(oControl.getCustomData(), function (oCustomData) {
              return (
                oCustomData.getKey() === key &&
                (value === undefined ? true : oCustomData.getValue() === value)
              );
            }).length !== 0
          );
        });
      },

      _checkPendingChanges: function () {
        return this.getModel().hasPendingChanges();
      },

      _getCustomData: function (oControl, key) {
        return $.grep(oControl.getCustomData(), function (oCustomData) {
          return oCustomData.getKey() === key;
        })[0];
      },

      _getFilteredByCustomDataSingle: function (aControls, key, value) {
        return this._filterByCustomData(aControls, key, value)[0];
      },

      _getFilteredByCustomDataMulti: function (aControls, key, value) {
        return this._filterByCustomData(aControls, key, value);
      },

      _getRowCustomDataId: function (oRow) {
        return this._getCustomData(oRow, "nrId").getValue();
      },

      _checkEditMode: function (oRow) {
        return (
          this._getRowCustomDataId(oRow) ===
          this._getEditRowModel().getProperty("/id")
        );
      },

      _getButtonParentContainer: function (oButton) {
        return oButton.getParent();
      },

      _getButtonParentRow: function (oButton) {
        return oButton.getParent().getParent();
      },

      _setEditModeForRow: function (oRow, bEnabled) {
        var aNumberRangeInput = this._getFilteredByCustomDataMulti(
          this._getFilteredByCustomDataMulti(
            oRow.getCells(),
            "nrInput",
            "true"
          ),
          "readonly",
          "false"
        );
        $.each(aNumberRangeInput, function (_, oInput) {
          oInput.setEditable(bEnabled);
        });
        this._getEditRowModel().setProperty(
          "/id",
          bEnabled ? this._getRowCustomDataId(oRow) : ""
        );
        this._getRowButton(oRow, "reset").setEnabled(bEnabled);
      },

      _findRowInEditMode: function () {
        return this._getFilteredByCustomDataSingle(
          this._getNumberRangeTable().getItems(),
          "nrId",
          this._getEditRowModel().getProperty("/id")
        );
      },

      _setEditModeDisabled: function () {
        var oRowInEditMode = this._findRowInEditMode();
        if (oRowInEditMode) this._setEditModeForRow(oRowInEditMode, false);
      },

      _setRowEditMode: function (oButton, bAlreadyEditMode) {
        var oRow = this._getButtonParentRow(oButton);
        this._setEditModeDisabled();
        if (!bAlreadyEditMode) {
          this._setEditModeForRow(oRow, true);
        }
      },

      _getRowButton: function (oRow, sBtnRole) {
        return this._getFilteredByCustomDataSingle(
          this._getFilteredByCustomDataSingle(
            oRow.getCells(),
            "btnBox",
            "true"
          ).getItems(),
          "btnRole",
          sBtnRole
        );
      },

      _setEnabledSaveCancelForRow: function (oRow, bEnabled) {
        this._getRowButton(oRow, "save").setEnabled(bEnabled);
        this._getRowButton(oRow, "cancel").setEnabled(bEnabled);
      },

      _changeSaveCancelState: function (oRow) {
        var oEditRow = oRow || this._findRowInEditMode();
        this._setEnabledSaveCancelForRow(oEditRow, this._checkPendingChanges());
      },

      _onNrSaveSuccess: function () {
        this._setUIBusy(false);
        this._changeSaveCancelState();
        MessageToast.show(this.getI18Text("saveSuccess"));
        this._getNumberRangeTable().getBinding("items").refresh();
      },

      _onNrSaveError: function () {
        this._setUIBusy(false);
        MessageBox.error(oError.message);
      },

      _submitBatch: function () {
        this.getModel()
          .submitBatch(this.BATCH_GROUP_NR)
          .then(
            this._onNrSaveSuccess.bind(this),
            this._onNrSaveError.bind(this)
          );
      },

      _checkStartValueInput: function (oInput) {
        return (
          $.grep(oInput.getCustomData(), function (oCustomData) {
            return (
              oCustomData.getKey() === "inputType" &&
              oCustomData.getValue() === "startValue"
            );
          }).length !== 0
        );
      },

      _equalStartWithCurrent: function (oInput) {
        var oInputCurrentValue = this._getFilteredByCustomDataSingle(
          oInput.getParent().getCells(),
          "inputType",
          "currentValue"
        );
        if (oInput.getValue() > oInputCurrentValue.getValue()) {
          oInputCurrentValue
            .getBindingContext()
            .setProperty("current", oInput.getValue());
        }
      },

      _onDeleteNrSuccess: function () {
        MessageToast.show(this.getI18Text("deleteSuccessfull"));
      },

      _onDeleteNrError: function () {
        MessageBox.error(oError.message);
      },

      _resetCurrentValue: function (oRowControl) {
        debugger;
        var oRowContext = oRowControl.getBindingContext();
        oRowContext.setProperty(
          "current",
          oRowContext.getProperty("startValue")
        );
      },

      _showUnsavedDataDialog: function () {
        MessageBox.show(this.getI18Text("unsavedDataExist"), {
          icon: MessageBox.Icon.WARNING,
          title: this.getI18Text("unsavedDataTitle"),
          actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
          onClose: this._onCloseUnsavedDataDialog.bind(this),
        });
      },

      _onCloseUnsavedDataDialog: function (sAction) {
        if (sAction === MessageBox.Action.OK) {
          this._resetPendingChanges(this.BATCH_GROUP_NR);
          this._changeSaveCancelState();
          this._setEditModeDisabled();
          BaseController.prototype.onNavBack.call(this);
        }
      },

      _createNumberRange: function () {
        return this._getNumberRangeTable().getBinding("items").create({
          startValue: "",
          endValue: "",
          current: "",
          description: "",
        });
      },

      onNumberRangeEdit: function (oEvent) {
        this._setRowEditMode(
          oEvent.getSource(),
          this._checkEditMode(this._getButtonParentRow(oEvent.getSource()))
        );
      },

      onNumberRangeInputChange: function (oEvent) {
        var oInput = oEvent.getSource();
        this._changeSaveCancelState(oInput.getParent());
        if (this._checkStartValueInput(oInput)) {
          this._equalStartWithCurrent(oInput);
        }
      },

      onNumberRangeSave: function () {
        this._setUIBusy(true);
        this._submitBatch();
      },

      onNumberRangeCancel: function (oEvent) {
        this._resetPendingChanges(this.BATCH_GROUP_NR);
        this._changeSaveCancelState(
          this._getButtonParentRow(oEvent.getSource())
        );
      },

      onNumberRangeDelete: function (oEvent) {
        oEvent
          .getSource()
          .getBindingContext()
          .delete("$auto")
          .then(
            this._onDeleteNrSuccess.bind(this),
            this._onDeleteNrError.bind(this)
          );
      },

      onNumberRangeAdd: function () {
        this._setEditModeDisabled();
        var oNewContext = this._createNumberRange();
        this._getEditRowModel().setProperty(
          "/id",
          oNewContext.getProperty("ID")
        );
        var oNewRow = this._findRowInEditMode();
        this._setEditModeForRow(oNewRow, true);
        this._changeSaveCancelState(oNewRow);
      },

      onNumberRangeRemoveAll: function (oEvent) {},

      onNumberRangeReset: function (oEvent) {
        this._resetCurrentValue(oEvent.getSource());
      },

      onNavBack: function () {
        if (this._checkPendingChanges()) {
          this._showUnsavedDataDialog();
        } else {
          BaseController.prototype.onNavBack.call(this);
        }
      },
    });
  }
);
