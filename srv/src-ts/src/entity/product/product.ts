import { UUID } from '../../common/types/types';

interface Product {
    ID: UUID;
    number: String;
    description: String;
    weight: Number;
    weightUnit: String;
    volume: Number;
    volumeUnit: String;
}

export default Product;