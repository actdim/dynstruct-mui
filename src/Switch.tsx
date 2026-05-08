import React from 'react';
import {
    Switch as MuiSwitch,
    FormControl,
    FormControlLabel,
    FormHelperText,
    type SwitchProps as MuiSwitchProps,
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
            color?: MuiSwitchProps['color'];
            size?: MuiSwitchProps['size'];
            sx?: MuiFormControlProps['sx'];
        };
    }
>;

export const useSwitch = (params: ComponentParams<Struct>): Component<Struct> => {
    let c: Component<Struct>;
    let m: ComponentModel<Struct>;

    const def: ComponentDef<Struct> = {
        regType: 'Switch',
        props: {
            checked: false,
            onChange: () => {},
            label: undefined,
            helperText: undefined,
            error: false,
            color: 'primary',
            size: 'medium',
            sx: undefined,
        },
        view: () => {
            const sw = (
                <MuiSwitch
                    checked={m.checked}
                    onChange={(e) => m.onChange(e.target.checked)}
                    color={m.color}
                    size={m.size}
                />
            );
            return (
                <FormControl
                    error={m.error}
                    disabled={m.$.isDisabled}
                    sx={m.sx}
                >
                    {m.label != null ? (
                        <FormControlLabel control={sw} label={m.label} />
                    ) : (
                        sw
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

export type SwitchStruct = Struct;

export const Switch = toReact(useSwitch);
Switch.displayName = 'Switch';
