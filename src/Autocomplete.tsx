import React from 'react';
import {
    Autocomplete as MuiAutocomplete,
    TextField as MuiTextField,
    type AutocompleteProps as MuiAutocompleteProps,
    type TextFieldProps as MuiTextFieldProps,
} from '@mui/material';
import {
    type ComponentStruct,
    type ComponentDef,
    type ComponentParams,
    type Component,
    type ComponentModel,
} from '@actdim/dynstruct/componentModel/contracts';
import { useComponent, toReact } from '@actdim/dynstruct/componentModel/react/hooks';
import { type BaseAppMsgStruct } from '@actdim/dynstruct/appDomain/appContracts';

type Struct<TMsgStruct extends BaseAppMsgStruct = BaseAppMsgStruct> = ComponentStruct<
    TMsgStruct,
    {
        props: {
            value: string | null;
            onChange: (value: string | null) => void;
            options: string[];
            label?: string;
            placeholder?: string;
            helperText?: string;
            error?: boolean;
            loading?: boolean;
            freeSolo?: boolean;
            fullWidth?: boolean;
            variant?: MuiTextFieldProps['variant'];
            size?: MuiAutocompleteProps<string, false, false, false>['size'];
            sx?: MuiAutocompleteProps<string, false, false, false>['sx'];
        };
    }
>;

export const useAutocomplete = (params: ComponentParams<Struct>): Component<Struct> => {
    let c: Component<Struct>;
    let m: ComponentModel<Struct>;

    const def: ComponentDef<Struct> = {
        regType: 'Autocomplete',
        props: {
            value: null,
            onChange: () => {},
            options: [],
            label: undefined,
            placeholder: undefined,
            helperText: undefined,
            error: false,
            loading: false,
            freeSolo: false,
            fullWidth: false,
            variant: 'outlined',
            size: 'medium',
            sx: undefined,
        },
        view: () => (
            <MuiAutocomplete
                value={m.value}
                onChange={(_, newValue) => m.onChange(newValue)}
                options={m.options}
                loading={m.loading}
                freeSolo={m.freeSolo}
                fullWidth={m.fullWidth}
                size={m.size}
                disabled={m.$.isDisabled}
                readOnly={m.$.isReadOnly}
                sx={m.sx}
                renderInput={(params) => (
                    <MuiTextField
                        {...params}
                        label={m.label}
                        placeholder={m.placeholder}
                        error={m.error}
                        helperText={m.helperText}
                        variant={m.variant}
                    />
                )}
            />
        ),
    };

    c = useComponent(def, params);
    m = c.model;
    return c;
};

export type AutocompleteStruct = Struct;

export const Autocomplete = toReact(useAutocomplete);
Autocomplete.displayName = 'Autocomplete';
