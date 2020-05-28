import NumberRange from './number-range';
import { IsString, MinLength, MaxLength, IsNumberString } from 'class-validator';
import { injectable } from 'inversify';

@injectable()
class NumberRangeEntity implements Partial<NumberRange> {

    @IsString()
    @MaxLength(20)
    @MinLength(4)
    @IsNumberString()
    startValue?: string;

    @IsString()
    @MaxLength(20)
    @MinLength(4)
    @IsNumberString()
    endValue?: string;

    @IsString()
    @MaxLength(20)
    @MinLength(4)
    @IsNumberString()
    current?: string;

    @IsString()
    description?: string;

}

export default NumberRangeEntity;