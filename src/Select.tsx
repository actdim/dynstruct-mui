import React from 'react';
import {
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select as MuiSelect,
    type SelectProps as MuiSelectProps,
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

export type SelectOption = {
    value: string;
    label: string;
};

type Struct<TMsgStruct extends BaseAppMsgStruct = BaseAppMsgStruct> = ComponentStruct<
    TMsgStruct,
    {
        props: {
            value: string;
            onChange: (value: string) => void;
            options: SelectOption[];
            label?: string;
            helperText?: string;
            error?: boolean;
            fullWidth?: boolean;
            variant?: MuiSelectProps['variant'];
            size?: MuiSelectProps['size'];
            color?: MuiSelectProps['color'];
            sx?: MuiSelectProps['sx'];
        };
    }
>;

export const useSelect = (params: ComponentParams<Struct>): Component<Struct> => {
    let c: Component<Struct>;
    let m: ComponentModel<Struct>;

    const def: ComponentDef<Struct> = {
        regType: 'Select',
        props: {
            value: '',
            onChange: () => {},
            options: [],
            label: undefined,
            helperText: undefined,
            error: false,
            fullWidth: false,
            variant: 'outlined',
            size: 'medium',
            color: 'primary',
            sx: undefined,
        },
        view: () => {
            const labelId = `${c.id}-label`;
            return (
                <FormControl
                    fullWidth={m.fullWidth}
                    variant={m.variant}
                    size={m.size}
                    error={m.error}
                    disabled={m.$.isDisabled}
                    sx={m.sx}
                >
                    {m.label && <InputLabel id={labelId}>{m.label}</InputLabel>}
                    <MuiSelect
                        labelId={m.label ? labelId : undefined}
                        label={m.label}
                        value={m.value}
                        onChange={(e) => m.onChange(e.target.value as string)}
                        color={m.color}
                        inputProps={{ readOnly: m.$.isReadOnly }}
                    >
                        {m.options.map((opt) => (
                            <MenuItem key={opt.value} value={opt.value}>
                                {opt.label}
                            </MenuItem>
                        ))}
                    </MuiSelect>
                    {m.helperText && <FormHelperText>{m.helperText}</FormHelperText>}
                </FormControl>
            );
        },
    };

    c = useComponent(def, params);
    m = c.model;
    return c;
};

export type SelectStruct = Struct;

export const Select = toReact(useSelect);
Select.displayName = 'Select';
