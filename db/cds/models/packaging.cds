namespace com.leverx.warehouse;

using cuid from '@sap/cds/common';
using com.leverx.warehouse.Materials as Material from './material';
using com.leverx.warehouse as common from '../common/index';
using com.leverx.warehouse as customizing from '../customizing/index';

entity PackagingMaterials : cuid {
    material       : Association to Material;
    maxWeight      : common.Weight;
    weightUnit     : common.Unit;
    weightUnitCode : Association to customizing.Units on weightUnitCode.code = weightUnit;
    maxVolume      : common.Volume;
    volumeUnit     : common.Unit;
    volumeUnitCode : Association to customizing.Units on volumeUnitCode.code = volumeUnit;
}
