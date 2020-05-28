import { injectable, inject } from 'inversify';
import Builder from '../builder';
import NumberRange from './number-range';
import NumberRangeEntity from './number-range-entity';
import INV_TYPES from '../../common/types/inver-types';

@injectable()
class NumberRangeBuilder extends Builder<NumberRange, NumberRangeEntity> {

    constructor(@inject(INV_TYPES.NumberRangeEntity) nrType: new () => NumberRangeEntity) {
        super(nrType);
    }

    withId(id: string) {
        this.entity.ID = id;
        return this;
    }

    withStartValue(startValue: string) {
        this.entity.startValue = startValue;
        return this;
    }

    withEndValue(endValue: string) {
        this.entity.endValue = endValue;
        return this;
    }

    withCurrentValue(current: string) {
        this.entity.current = current;
        return this;
    }

    withDescription(description: string) {
        this.entity.description = description;
        return this;
    }

}

export default NumberRangeBuilder;