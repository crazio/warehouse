namespace com.leverx.warehouse;

using { cuid, managed } from '@sap/cds/common';
using com.leverx.warehouse.PackagingMaterials as PackagingMaterials from './packaging';
using com.leverx.warehouse.Items as Items from './item';

entity HandlingUnits : cuid, managed {
    number    : String(20) not null;
    packaging : Association to PackagingMaterials;
    items     : Composition of many Items on items.parent = $self;
}
