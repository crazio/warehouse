namespace com.leverx.warehouse;

using cuid from '@sap/cds/common';
using com.leverx.warehouse as common from '../common/index';
using com.leverx.warehouse as customizing from '../customizing/index';

entity Materials : cuid {
    number         : String(20);
    description    : localized String(200);
    wightUnit      : common.Unit;
    weightUnitCode : Association to customizing.Units on weightUnitCode.code = wightUnit;
    weight         : common.Weight;
    volumeUnit     : common.Unit;
    volumeUnitCode : Association to customizing.Units on volumeUnitCode.code = volumeUnit;
    volume         : common.Volume;
}
