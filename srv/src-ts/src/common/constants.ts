export enum Event {
    READ = 'READ',
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE',
    UPSERT_EVENT = 'UPSERT',
    SAVE = 'SAVE',
    CANCEL = 'CANCEL'
};

export enum EntityName {
    Products = 'Products',
    HandlingUnits = 'HandlingUnits',
    Items = 'Items',
    PackagingMaterials = 'PackagingMaterials',
    Stock = 'Stock',
    Conversions = 'Conversions',
    NumberRanges = 'NumberRanges',
    Units = 'Units'
}

export enum ServiceName {
    ProductService = 'ProductService',
    CustomizingService = 'CustomizingService'
}

export enum Folder {
    db = 'db',
    srv = 'srv',
    app = 'app'
}

export enum Common {
    namespace = 'com.leverx.warehouse'
}