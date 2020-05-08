using com.leverx.warehouse as services from '../../srv/index';

annotate services.ProductService.Products with @(

    UI : {

            HeaderInfo : {
                TypeName       : '{i18n>product}',
                TypeNamePlural : '{i18n>products}',
                Title          : { Value : number },
                Description    : { Value : description }

            },

            LineItem : [
                { $Type : 'UI.DataField', Value : number },
                { $Type : 'UI.DataField', Value : description },
                // { $Type : 'UI.DataFieldForAnnotation', Target : '@UI.ConnectedFields#ProductNumberDescr' },
                { $Type : 'UI.DataField', Value : weight },
                { $Type : 'UI.DataField', Value : weightUnit },
                { $Type : 'UI.DataField', Value : volume },
                { $Type : 'UI.DataField', Value : volumeUnit }
            ]

            // ConnectedFields#ProductNumberDescr : {
            //     Label : 'Product',
            //     Template : '{Number}-{Description}',
            //     Data : [
            //         { Number : { $Type : 'UI.DataField', Value : number } },
            //         { Description : { $Type : 'UI.DataField', Value : description } }
            //     ]
            // },

    },

    Common: { 
        SemanticKey: [number]
    },

    UI : {

            SelectionFields : [
                number,
                description
            ],

            Facets : [
                { $Type  : 'UI.ReferenceFacet', Label  : '{i18n>generalInfo}', Target : '@UI.FieldGroup#GeneralInfo' }
            ],

            FieldGroup#GeneralInfo : {
                Data : [
                    { $Type : 'UI.DataField', Value : number },
                    { $Type : 'UI.DataField', Value : description },
                    { $Type : 'UI.DataField', Value : weight },
                    { $Type : 'UI.DataField', Value : weightUnit },
                    { $Type : 'UI.DataField', Value : volume },
                    { $Type : 'UI.DataField', Value : volumeUnit }
                ]
            }
    }

) {

    number
    @title: '{i18n>number}';

    description
    @title: '{i18n>description}';

    weight
    @title: '{i18n>weight}';

    weightUnit
    @title: '{i18n>weightUnit}';

    volume
    @title: '{i18n>volume}';

    volumeUnit
    @title: '{i18n>volumeUnit}';

}
