import container from './src/inversify.config';
import { ServeOption } from './src/common/types/types';
import { ServiceName, Common } from './src/common/constants';
import INV_TYPES from './src/common/types/inver-types';
import App from './app';
import ProductServiceHandler from './src/handler/product/product-service-handler';
import CustomizingServiceHandler from './src/handler/customizing/customizing-service-handler';

const SERVICE_IMPL: ServeOption[] = [
    {
        name: `${Common.namespace}.${ServiceName.ProductService}`,
        impl: container.get<ProductServiceHandler>(INV_TYPES.ProductServiceHandler).impl
    },
    {
        name: `${Common.namespace}.${ServiceName.CustomizingService}`,
        impl: container.get<CustomizingServiceHandler>(INV_TYPES.CustomizingServiceHandler).impl
    }
];

export = async () => {
    const app = new App();
    await app.serveImpl(SERVICE_IMPL);
    const PORT = process.env.PORT || 4004;
    return app.listen(PORT);
};
