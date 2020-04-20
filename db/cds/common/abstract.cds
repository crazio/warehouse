namespace com.leverx.warehouse;

using cuid from '@sap/cds/common';

abstract entity Materials : cuid {
    number      : String(20) not null;
    description : localized String(200);
}
