import { injectable, inject } from 'inversify';
import ProductEntity from './product-entity';
import Product from './product';
import Builder from '../builder';
import { UUID } from '../../common/types/types';
import INV_TYPES from '../../common/types/inver-types';

@injectable()
class ProductBuilder extends Builder<Product, ProductEntity> {

    constructor(@inject(INV_TYPES.ProductEntity) productType: new () => ProductEntity) {
        super(productType);
    }

    public withId(id: UUID) {
        this.entity.ID = id;
    }

    public withNumber(number: string) {
        this.entity.number = number;
        return this;
    }

    public withDescription(descr: string) {
        this.entity.description = descr;
        return this;
    }

    public withWeight(weight: number) {
        this.entity.weight = weight;
        return this;
    }

    public withWeightUnit(weightUnit: string) {
        this.entity.weightUnit = weightUnit;
        return this;
    }

    public withVolume(volume: number) {
        this.entity.volume = volume;
        return this;
    }

    public withVolumeUnit(volumeUnit: string) {
        this.entity.volumeUnit = volumeUnit;
        return this;
    }

}

export default ProductBuilder;