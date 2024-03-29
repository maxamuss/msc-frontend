export interface IBaseHelpText {
    help_text?: string;
}

export interface IBaseLabel {
    id?: string;
    label?: string;
}

export interface IBaseField extends IBaseHelpText, IBaseLabel {
    name: string;
    field_type: string;
    default?: string;
    placeholder?: string;
    modelschema_id?: string;
    bare?: boolean;
}

export interface IInputField extends IBaseField {
    type: string;
    value?: any;
}

export interface ISelectField extends IBaseField {
    options?: Array<{
        id: string;
        name: any;
    }>;
    selected?: any;
}

export interface IForeignKeyField extends IBaseField {
    modelschema_id: string;
}