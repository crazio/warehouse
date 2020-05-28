import { UUID } from '../../common/types/types';
import Product from './product';
import { IsString, IsUppercase, MaxLength, IsNumber } from 'class-validator';
import { injectable } from 'inversify';

@injectable()
class ProductEntity implements Partial<Product> {
    @IsString()
    ID?: UUID;

    @IsUppercase()
    @MaxLength(20)
    number?: String;

    @IsString()
    description?: String;

    @IsNumber()
    weight?: Number;

    @MaxLength(3)
    weightUnit?: String;

    @IsNumber()
    volume?: Number;

    @MaxLength(3)
    volumeUnit?: String;

    constructor(product: Partial<Product>) {
        Object.assign(this, product);
    }
}

export default ProductEntity;