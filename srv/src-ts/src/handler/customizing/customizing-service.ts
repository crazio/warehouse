import { injectable, inject } from 'inversify';
import Service from '../service';
import INV_TYPES from '../../common/types/inver-types';
import CustomizingServiceValidator from './customizing-service-validator';
import NumberRangeBuilder from '../../entity/number-range/number-range-builder';

@injectable()
class CustomizingService extends Service {

    private customizingServiceValidator: CustomizingServiceValidator;
    private numberRangeBuilder: NumberRangeBuilder;

    constructor(
        @inject(INV_TYPES.CustomizingServiceValidator) customizingServiceValidator: CustomizingServiceValidator,
        @inject(INV_TYPES.NumberRangeBuilder) numberRangeBuilder: NumberRangeBuilder
    ) {
        super();
        this.customizingServiceValidator = customizingServiceValidator;
        this.numberRangeBuilder = numberRangeBuilder;
    }

    public checkConversionConstraints() {
        this.customizingServiceValidator.checkConversionConstraints(
            { ...this.req?.data }
        );
    }

    public async checkNumberRangeConstraints() {
        await this.customizingServiceValidator.checkNumberRangeConstraints(
            this.numberRangeBuilder.withCopy({ ...this.req?.data }).build()
        );
    }

}

export default CustomizingService;