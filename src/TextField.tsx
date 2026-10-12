import React from 'react';
import { TextField as MuiTextField, type TextFieldProps as MuiTextFieldProps } from '@mui/material';
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

type Struct<TMsgStruct extends BaseAppMsgStruct = BaseAppMsgStruct> = ComponentStruct<
    TMsgStruct,
    {
        props: {
            value: string;
            onChange?: (value: string) => void;
            label?: string;
            placeholder?: string;
            helperText?: string;
            error?: boolean;
            disabled?: boolean;
            required?: boolean;
            type?: string;
            multiline?: boolean;
            rows?: number;
            fullWidth?: boolean;
            variant?: MuiTextFieldProps['variant'];
            size?: MuiTextFieldProps['size'];
            color?: MuiTextFieldProps['color'];
            slotProps?: MuiTextFieldProps['slotProps'];
            sx?: MuiTextFieldProps['sx'];
            onKeyDown?: (event: React.KeyboardEvent) => void;
        };
    }
>;

export const useTextField = (params: ComponentParams<Struct>): Component<Struct> => {
    let c: Component<Struct>;
    let m: ComponentModel<Struct>;

    const def: ComponentDef<Struct> = {
        regType: 'TextField',
        props: {
            value: '',
            onChange: undefined,
            label: undefined,
            placeholder: undefined,
            helperText: undefined,
            error: false,
            disabled: false,
            required: false,
            type: 'text',
            multiline: false,
            rows: undefined,
            fullWidth: false,
            variant: 'outlined',
            size: 'medium',
            color: 'primary',
            // MUI slot props may hold React content (e.g. input.endAdornment): stored by reference
            slotProps: prop({ reactive: 'ref' }),
            sx: undefined,
            onKeyDown: undefined,
        },
        view: () => (
            <MuiTextField
                value={m.value}
                onChange={(e) => {
                    m.value = e.target.value;
                    if (m.onChange) {
                        m.onChange(e.target.value);
                    }
                }}
                onKeyDown={m.onKeyDown}
                label={m.label}
                placeholder={m.placeholder}
                helperText={m.helperText}
                error={m.error}
                required={m.required}
                type={m.type}
                multiline={m.multiline}
                rows={m.rows}
                fullWidth={m.fullWidth}
                variant={m.variant}
                size={m.size}
                color={m.color}
                disabled={m.disabled || m.$.isDisabled}
                slotProps={{
                    ...m.slotProps,
                    input: {
                        readOnly: m.$.isReadOnly,
                        ...m.slotProps?.input,
                    },
                }}
                sx={m.sx}
            />
        ),
    };

    c = useComponent(def, params);
    m = c.model;

    return c;
};

export type TextFieldStruct = Struct;

export const TextField = toReact(useTextField);
TextField.displayName = 'TextField';
