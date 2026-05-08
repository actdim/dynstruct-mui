import React from 'react';
import {
    Checkbox as MuiCheckbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    type CheckboxProps as MuiCheckboxProps,
    type FormControlProps as MuiFormControlProps,
} from '@mui/material';
import {
    type ComponentStruct,
    type ComponentDef,
    type ComponentParams,
    type Component,
    type ComponentModel,
} from '@actdim/dynstruct/componentModel/contracts';
import { useComponent, toReact } from '@actdim/dynstruct/componentModel/react/react';
import { type BaseAppMsgStruct } from '@actdim/dynstruct/appDomain/appContracts';

type Struct<TMsgStruct extends BaseAppMsgStruct = BaseAppMsgStruct> = ComponentStruct<
    TMsgStruct,
    {
        props: {
            checked: boolean;
            onChange: (checked: boolean) => void;
            label?: string;
            helperText?: string;
            error?: boolean;
            color?: MuiCheckboxProps['color'];
            size?: MuiCheckboxProps['size'];
            indeterminate?: boolean;
            sx?: MuiFormControlProps['sx'];
        };
    }
>;

export const useCheckbox = (params: ComponentParams<Struct>): Component<Struct> => {
    let c: Component<Struct>;
    let m: ComponentModel<Struct>;

    const def: ComponentDef<Struct> = {
        regType: 'Checkbox',
        props: {
            checked: false,
            onChange: () => {},
            label: undefined,
            helperText: undefined,
            error: false,
            color: 'primary',
            size: 'medium',
            indeterminate: false,
            sx: undefined,
        },
        view: () => {
            const checkbox = (
                <MuiCheckbox
                    checked={m.checked}
                    onChange={(e) => m.onChange(e.target.checked)}
                    color={m.color}
                    size={m.size}
                    indeterminate={m.indeterminate}
                />
            );
            return (
                <FormControl
                    error={m.error}
                    disabled={m.$.isDisabled}
                    sx={m.sx}
                >
                    {m.label != null ? (
                        <FormControlLabel control={checkbox} label={m.label} />
                    ) : (
                        checkbox
                    )}
                    {m.helperText && <FormHelperText>{m.helperText}</FormHelperText>}
                </FormControl>
            );
        },
    };

    c = useComponent(def, params);
    m = c.model;
    return c;
};

export type CheckboxStruct = Struct;

export const Checkbox = toReact(useCheckbox);
Checkbox.displayName = 'Checkbox';
