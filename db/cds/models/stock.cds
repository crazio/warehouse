namespace com.leverx.warehouse;

using cuid from '@sap/cds/common';
using com.leverx.warehouse.Materials as Material from './material';
using com.leverx.warehouse as common from '../common/index';
using com.leverx.warehouse as customizing from '../customizing/index';

entity Stock : cuid {
    material : Association to Material;
    quantity : common.Quantity;
    unit     : common.Unit;
    unitCode : Association to customizing.Units on unitCode.code = unit;
}
