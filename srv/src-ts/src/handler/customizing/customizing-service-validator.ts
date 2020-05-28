import { injectable, inject } from 'inversify';
import Conversion from '../../entity/conversion/conversion';
import INV_TYPES from '../../common/types/inver-types';
import CdsEntityValidator from '../../common/validator/cds-entity-validator';
import NumberRangeEntity from '../../entity/number-range/number-range-entity';

@injectable()
class CustomizingServiceValidator {

    private cdsEntityValidator: CdsEntityValidator;

    constructor(
        @inject(INV_TYPES.CdsEntityValidator) cdsEntityValidator: CdsEntityValidator,
    ) {
        this.cdsEntityValidator = cdsEntityValidator;
    }

    public checkConversionConstraints(conversion: Conversion) {
        this.checkEqualUnits(conversion.unitFrom, conversion.unitTo);
        this.checkNumeratorDenominator(conversion.numerator, conversion.denominator);
    }

    public async checkNumberRangeConstraints(numberRange: NumberRangeEntity) {
        await this.cdsEntityValidator.validate(numberRange);
    }

    private checkEqualUnits(unitFrom: string, unitTo: string) {
        if (unitFrom === unitTo)
            throw new Error(`Souce and target units should be different. `);
    }

    private checkNumeratorDenominator(numerator: number, denominator: number) {
        if (numerator >= denominator)
            throw new Error(
                `Numerator(${numerator}) should be less then denominator(${denominator})`
            );
    }

}

export default CustomizingServiceValidator;