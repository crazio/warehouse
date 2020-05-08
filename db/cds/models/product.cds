namespace com.leverx.warehouse;

using cuid from '@sap/cds/common';
using com.leverx.warehouse as common from '../common/index';
using com.leverx.warehouse as customizing from '../customizing/index';

entity Products : common.Materials {
    weight         : common.Weight not null;
    weightUnit      : common.Unit not null;
    weightUnitCode : Association to customizing.Units on weightUnitCode.code = weightUnit;
    volume         : common.Volume not null;
    volumeUnit     : common.Unit not null;
    volumeUnitCode : Association to customizing.Units on volumeUnitCode.code = volumeUnit;
}
