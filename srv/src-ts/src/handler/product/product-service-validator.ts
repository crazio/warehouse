import { injectable, inject } from 'inversify';
import CdsServiceValidator from '../../common/validator/cds-entity-validator';
import INV_TYPES from '../../common/types/inver-types';
import Product from '../../entity/product/product-entity';

@injectable()
class ProductServiceValidator {

    private cdsServiceValidator: CdsServiceValidator;

    constructor(@inject(INV_TYPES.CdsEntityValidator) cdsServiceValidator: CdsServiceValidator) {
        this.cdsServiceValidator = cdsServiceValidator;
    }

    public async validateProductConstraints(product: Product) {
        await this.cdsServiceValidator.validate(product);
    }

}

export default ProductServiceValidator;