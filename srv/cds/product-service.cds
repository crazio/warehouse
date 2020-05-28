namespace com.leverx.warehouse;

using com.leverx.warehouse as models from '../../db/cds/models/index';

service ProductService {
    @odata.draft.enabled
    entity Products as projection on models.Products;
}
