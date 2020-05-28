import { UUID } from '../../common/types/types';

interface NumberRange {
    ID: UUID;
    startValue: string;
    endValue: string;
    current: string;
    description: string;
}

export default NumberRange;