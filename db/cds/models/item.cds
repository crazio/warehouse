namespace com.leverx.warehouse;

using cuid from '@sap/cds/common';
using com.leverx.warehouse.HandlingUnits as HandlingUnits from './hu';
using com.leverx.warehouse.Stock as Stock from './stock';
using com.leverx.warehouse as customizing from '../customizing/index';
using com.leverx.warehouse as common from '../common/index';

entity Items : cuid {
    key parent   : Association to HandlingUnits;
        stock    : Association to Stock;
        quantity : common.Quantity not null;
        unit     : common.Unit not null;
        unitCode : Association to customizing.Units on unitCode.code = unit;
}
