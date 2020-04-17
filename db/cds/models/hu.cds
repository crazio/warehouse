namespace com.leverx.warehouse;

using { cuid, managed } from '@sap/cds/common';

entity HandlingUnits : cuid, managed {
    number : String(20);
}
