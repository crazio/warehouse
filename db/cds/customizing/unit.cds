namespace com.leverx.warehouse;

using sap.common.CodeList as CodeList from '@sap/cds/common';

entity Units : CodeList {
    key code : String(3);
}