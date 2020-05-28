using com.leverx.warehouse as services from '../../srv/index';

annotate services.ProductService.Products with @(

    Common : {
        SemanticKey : [number]
    },

    UI : {

        HeaderInfo : {
            TypeName : '{i18n>product}',
            TypeNamePlural : '{i18n>products}',
            Title : { Value : number },
            Description : { Value : description }
        },

        LineItem : [
            { $Type : 'UI.DataField', Value : number },
            { $Type : 'UI.DataField', Value : description },
            { $Type : 'UI.DataField', Value : weight },
            { $Type : 'UI.DataField', Value : weightUnit },
            { $Type : 'UI.DataField', Value : volume },
            { $Type : 'UI.DataField', Value : volumeUnit }
        ]

    },

    UI : {

        SelectionFields : [
            number
        ],

        Facets : [
            { $Type : 'UI.ReferenceFacet', Label : '{i18n>generalInfo}', Target : '@UI.FieldGroup#GeneralInfo' },
            { $Type : 'UI.ReferenceFacet', Label : '{i18n>weight}', Target : '@UI.FieldGroup#Weight' },
            { $Type : 'UI.ReferenceFacet', Label : '{i18n>volume}', Target : '@UI.FieldGroup#Volume' }
        ],

        FieldGroup#GeneralInfo : {
            Data : [
                { $Type : 'UI.DataField', Value : number },
                { $Type : 'UI.DataField', Value : description }
            ]
        },

        FieldGroup#Weight : {
            Data : [
                { $Type : 'UI.DataField', Value : weight },
                { $Type : 'UI.DataField', Value : weightUnit }
            ]
        },

        FieldGroup#Volume : {
            Data : [
                { $Type : 'UI.DataField', Value : volume },
                { $Type : 'UI.DataField', Value : volumeUnit }
            ]
        }
    }
) {

    number
    @title : '{i18n>number}'
    @Search.defaultSearchElement: true
    @Common.FieldControl : #Mandatory
    @Common.IsUpperCase : true;

    description
    @title : '{i18n>description}'
    @Common.FieldControl : #Mandatory;

    weight
    @title : '{i18n>weight}'
    @Common.FieldControl : #Mandatory;

    weightUnit
    @title : '{i18n>weightUnit}'
    @Common : {
        FieldControl : #Mandatory,
        ValueListWithFixedValues : true,
        ValueList : {
            Label : '{i18n>weightUnit}',
            CollectionPath : 'Units',
            Parameters : [
                { $Type : 'Common.ValueListParameterInOut', LocalDataProperty : weightUnit, ValueListProperty : 'code' },
                { $Type : 'Common.ValueListParameterDisplayOnly', ValueListProperty : 'code' },
                { $Type : 'Common.ValueListParameterDisplayOnly', ValueListProperty : 'name' }
            ]
        }
    };

    volume
    @title : '{i18n>volume}'
    @Common.FieldControl : #Mandatory;

    volumeUnit
    @title : '{i18n>volumeUnit}'
    @Common : {
        FieldControl : #Mandatory,
        ValueListWithFixedValues : true,
        ValueList : {
            Label : '{i18n>weightUnit}',
            CollectionPath : 'Units',
            Parameters : [
                { $Type : 'Common.ValueListParameterInOut', LocalDataProperty : volumeUnit, ValueListProperty : 'code' },
                { $Type : 'Common.ValueListParameterDisplayOnly', ValueListProperty : 'code' },
                { $Type : 'Common.ValueListParameterDisplayOnly', ValueListProperty : 'name' }
            ]
        } 
    };

}
