namespace com.leverx.warehouse;

using cuid from '@sap/cds/common';
using com.leverx.warehouse.Products as Products from './product';
using com.leverx.warehouse as common from '../common/index';
using com.leverx.warehouse as customizing from '../customizing/index';

entity Stock : cuid {
    material : Association to Products;
    quantity : common.Quantity not null;
    unit     : common.Unit not null;
    unitCode : Association to customizing.Units on unitCode.code = unit;
}
