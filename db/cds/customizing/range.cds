namespace com.leverx.warehouse;

using cuid from '@sap/cds/common';

entity NumberRanges : cuid {
    startValue : String(20) not null;
    endValue   : String(20) not null;
    current    : String(20) not null;
}
