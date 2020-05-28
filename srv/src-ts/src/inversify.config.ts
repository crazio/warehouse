import 'reflect-metadata';
import { Container } from 'inversify';
import ProductService from './handler/product/product-service';
import ProductServiceHandler from './handler/product/product-service-handler';
import ProductServiceValidator from './handler/product/product-service-validator';
import INV_TYPES from './common/types/inver-types';
import CdsEntityValidator from './common/validator/cds-entity-validator';
import ProductBuilder from './entity/product/product-builder';
import ProductEntity from './entity/product/product-entity';
import NumberRangeEntity from './entity/number-range/number-range-entity';
import CustomizingService from './handler/customizing/customizing-service';
import CustomizingServiceValidator from './handler/customizing/customizing-service-validator';
import CustomizingServiceHandler from './handler/customizing/customizing-service-handler';
import NumberRangeBuilder from './entity/number-range/number-range-builder';

const container = new Container();

//Common
container.bind<CdsEntityValidator>(INV_TYPES.CdsEntityValidator).to(CdsEntityValidator).inSingletonScope();

//Entity Types
container.bind<typeof ProductEntity>(INV_TYPES.ProductEntity).toConstantValue(ProductEntity);
container.bind<typeof NumberRangeEntity>(INV_TYPES.NumberRangeEntity).toConstantValue(NumberRangeEntity);

//Builders
container.bind<ProductBuilder>(INV_TYPES.ProductBuilder).to(ProductBuilder);
container.bind<NumberRangeBuilder>(INV_TYPES.NumberRangeBuilder).to(NumberRangeBuilder);

//ProductService
container.bind<ProductService>(INV_TYPES.ProductService).to(ProductService).inSingletonScope();
container.bind<ProductServiceValidator>(INV_TYPES.ProductServiceValidator).to(ProductServiceValidator).inSingletonScope();
container.bind<ProductServiceHandler>(INV_TYPES.ProductServiceHandler).to(ProductServiceHandler).inSingletonScope();

//CustomizingService
container.bind<CustomizingService>(INV_TYPES.CustomizingService).to(CustomizingService).inSingletonScope();
container.bind<CustomizingServiceValidator>(INV_TYPES.CustomizingServiceValidator).to(CustomizingServiceValidator).inSingletonScope();
container.bind<CustomizingServiceHandler>(INV_TYPES.CustomizingServiceHandler).to(CustomizingServiceHandler).inSingletonScope();


export default container;
