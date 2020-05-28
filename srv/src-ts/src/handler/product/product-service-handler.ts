import cds from '@sap/cds';
import { injectable, inject } from 'inversify';
import { Event, EntityName } from '../../common/constants';
import INV_TYPES from '../../common/types/inver-types';
import { Request } from '../../common/types/types';
import ServiceHandler from '../service-handler';
import ProductService from './product-service';

@injectable()
class ProductServiceHandler extends ServiceHandler<ProductService> {

    protected _impl = cds.service.impl(srv => {

        srv.before(Event.CREATE, EntityName.Products, async (req: Request) => {
            try {
                await this.execWithReq(req).checkProductConstraints();
            } catch (errors) {
                req.reject(400, `${errors}`);
            }
        });

    });

    constructor(@inject(INV_TYPES.ProductService) srvImpl: ProductService) {
        super(srvImpl);
    }

}

export default ProductServiceHandler;