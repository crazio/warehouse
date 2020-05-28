import { injectable, inject } from 'inversify';
import Service from '../service';
import ProductServiceValidator from './product-service-validator';
import INV_TYPES from '../../common/types/inver-types';
import ProductBuilder from '../../entity/product/product-builder';


@injectable()
class ProductService extends Service {

    private productServiceValidator: ProductServiceValidator;
    private productBuilder: ProductBuilder;

    constructor(
        @inject(INV_TYPES.ProductServiceValidator) productServiceValidator: ProductServiceValidator,
        @inject(INV_TYPES.ProductBuilder) productBuilder: ProductBuilder
    ) {
        super();
        this.productServiceValidator = productServiceValidator;
        this.productBuilder = productBuilder;
    }

    public async checkProductConstraints() {
        await this.productServiceValidator.validateProductConstraints(
            this.productBuilder.withCopy({ ...this.req?.data }).build()
        );
    }

}

export default ProductService;