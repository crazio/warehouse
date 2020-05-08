namespace com.leverx.warehouse;

using com.leverx.warehouse as common from '../common/index';
using com.leverx.warehouse as customizing from '../customizing/index';

//quantity(from) = quantity(to) * numerator / denominator
//quantity(to) = quantity(from) * denominator / numerator

entity Conversions {
    key unitFrom     : common.Unit;
    key unitTo       : common.Unit;
        unitFromCode : Association to customizing.Units on unitFromCode.code = unitFrom;
        unitToCode   : Association to customizing.Units on unitToCode.code = unitTo;
        numerator    : common.Factor not null;
        denominator  : common.Factor not null;
}
