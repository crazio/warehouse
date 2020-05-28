import { injectable, inject } from 'inversify';
import { Event, EntityName } from '../../common/constants';
import CustomizingService from './customizing-service';
import ServiceHandler from '../service-handler';
import INV_TYPES from '../../common/types/inver-types';
import { Request } from '../../common/types/types';


@injectable()
class CustomizingServiceHandler extends ServiceHandler<CustomizingService> {

    protected _impl = cds.service.impl(srv => {

        srv.before(Event.CREATE, EntityName.Conversions, (req: Request) => {
            try {
                this.execWithReq(req).checkConversionConstraints();
            } catch (error) {
                req.reject(400, error);
            }
        });

        srv.before(Event.CREATE, EntityName.NumberRanges, async (req: Request) => {
            try {
                await this.execWithReq(req).checkNumberRangeConstraints();
            } catch (errors) {
                req.reject(400, `${errors}`);
            }
        });

    });

    constructor(@inject(INV_TYPES.CustomizingService) srvImpl: CustomizingService) {
        super(srvImpl);
    }

}

export default CustomizingServiceHandler;