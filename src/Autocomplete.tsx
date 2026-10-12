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
import { prop } from '@actdim/dynstruct/componentModel/core';
import { type BaseAppMsgStruct } from '@actdim/dynstruct/appDomain/appContracts';

export type AutocompleteStruct<T = any, TMsgStruct extends BaseAppMsgStruct = BaseAppMsgStruct> = ComponentStruct<
    TMsgStruct,
    {
        props: {
            value: T | null;
            onChange?: (value: T | null) => void;
            onInputChange?: (value: string) => void;
            options: T[];
            getOptionLabel?: (option: T) => string;
            isOptionEqualToValue?: (option: T, value: T) => boolean;
            renderOption?: (props: React.HTMLAttributes<HTMLLIElement>, option: T) => React.ReactNode;
            label?: string;
            placeholder?: string;
            helperText?: string;
            error?: boolean;
            disabled?: boolean;
            loading?: boolean;
            freeSolo?: boolean;
            fullWidth?: boolean;
            variant?: MuiTextFieldProps['variant'];
            size?: MuiAutocompleteProps<T, false, false, boolean>['size'];
            slotProps?: MuiTextFieldProps['slotProps'];
            sx?: MuiAutocompleteProps<T, false, false, boolean>['sx'];
        };
    }
>;

export const useAutocomplete = <T = any>(params: ComponentParams<AutocompleteStruct<T>>): Component<AutocompleteStruct<T>> => {
    type Struct = AutocompleteStruct<T>;
    let c: Component<Struct>;
    let m: ComponentModel<Struct>;

    const def: ComponentDef<Struct> = {
        regType: 'Autocomplete',
        props: {
            value: null,
            onChange: undefined,
            onInputChange: undefined,
            options: [],
            getOptionLabel: undefined,
            isOptionEqualToValue: undefined,
            renderOption: undefined,
            label: undefined,
            placeholder: undefined,
            helperText: undefined,
            error: false,
            disabled: false,
            loading: false,
            freeSolo: false,
            fullWidth: false,
            variant: 'outlined',
            size: 'medium',
            // MUI slot props may hold React content (e.g. input.endAdornment): stored by reference
            // cast: with the generic option type T, TS cannot relate ComponentProp<X> to the mapped ComponentProps type;
            // at runtime this is the ref annotation (no initial value)
            slotProps: prop({ reactive: 'ref' }) as unknown as MuiTextFieldProps['slotProps'],
            sx: undefined,
        },
        view: () => (
            <MuiAutocomplete
                value={m.value}
                onChange={(_, newValue: any) => {
                    m.value = newValue;
                    if (m.onChange) {
                        m.onChange(newValue);
                    }
                }}
                onInputChange={
                    m.onInputChange
                        ? (_, newInputValue) => {
                            if (m.onInputChange) {
                                m.onInputChange(newInputValue);
                            }
                        }
                        : undefined
                }
                options={m.options}
                getOptionLabel={
                    m.getOptionLabel
                        ? (opt: any) => m.getOptionLabel!(opt)
                        : (opt: any) => (typeof opt === 'string' ? opt : String(opt ?? ''))
                }
                isOptionEqualToValue={
                    m.isOptionEqualToValue
                        ? (opt: any, val: any) => m.isOptionEqualToValue!(opt, val)
                        : (opt: any, val: any) => opt === val
                }
                renderOption={
                    m.renderOption
                        ? (props: any, opt: any) => m.renderOption!(props, opt)
                        : undefined
                }
                loading={m.loading}
                freeSolo={m.freeSolo}
                fullWidth={m.fullWidth}
                size={m.size}
                disabled={m.disabled || m.$.isDisabled}
                readOnly={m.$.isReadOnly}
                sx={m.sx}
                renderInput={(inputParams) => (
                    <MuiTextField
                        {...inputParams}
                        label={m.label}
                        placeholder={m.placeholder}
                        error={m.error}
                        helperText={m.helperText}
                        variant={m.variant}
                        slotProps={m.slotProps}
                    />
                )}
            />
        ),
    };

    c = useComponent(def, params);
    m = c.model;

    return c;
};

export type DefaultAutocompleteStruct = AutocompleteStruct<any>;
export const Autocomplete = toReact(useAutocomplete as (params: ComponentParams<DefaultAutocompleteStruct>) => Component<DefaultAutocompleteStruct>);
Autocomplete.displayName = 'Autocomplete';
