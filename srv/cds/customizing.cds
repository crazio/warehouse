namespace com.leverx.warehouse;

using com.leverx.warehouse as customizing from '../../db/cds/customizing/index';

service CustomizingService {
    entity Conversions as projection on customizing.Conversions;
    entity NumberRanges as projection on customizing.NumberRanges;
    entity Units as projection on customizing.Units;
}