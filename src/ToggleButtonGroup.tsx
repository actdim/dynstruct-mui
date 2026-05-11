import React from 'react';
import {
    ToggleButtonGroup as MuiToggleButtonGroup,
    ToggleButton as MuiToggleButton,
    type ToggleButtonGroupProps as MuiToggleButtonGroupProps,
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

export type ToggleItem = {
    value: string;
    label?: React.ReactNode;
    icon?: React.FC;
    disabled?: boolean;
};

type Struct<TMsgStruct extends BaseAppMsgStruct = BaseAppMsgStruct> = ComponentStruct<
    TMsgStruct,
    {
        props: {
            value: string | string[];
            onChange: (value: string | string[]) => void;
            items: ToggleItem[];
            exclusive?: boolean;
            size?: MuiToggleButtonGroupProps['size'];
            color?: MuiToggleButtonGroupProps['color'];
            orientation?: MuiToggleButtonGroupProps['orientation'];
            fullWidth?: boolean;
            sx?: MuiToggleButtonGroupProps['sx'];
        };
    }
>;

export const useToggleButtonGroup = (params: ComponentParams<Struct>): Component<Struct> => {
    let c: Component<Struct>;
    let m: ComponentModel<Struct>;

    const def: ComponentDef<Struct> = {
        regType: 'ToggleButtonGroup',
        props: {
            value: [],
            onChange: () => {},
            items: [],
            exclusive: false,
            size: 'medium',
            color: 'standard',
            orientation: 'horizontal',
            fullWidth: false,
            sx: undefined,
        },
        view: () => (
            <MuiToggleButtonGroup
                value={m.value}
                onChange={(_, newValue) => {
                    if (newValue !== null) m.onChange(newValue);
                }}
                exclusive={m.exclusive}
                size={m.size}
                color={m.color}
                orientation={m.orientation}
                fullWidth={m.fullWidth}
                disabled={m.$.isDisabled}
                sx={m.sx}
            >
                {m.items.map((item) => (
                    <MuiToggleButton key={item.value} value={item.value} disabled={item.disabled}>
                        {item.icon && <item.icon />}
                        {item.label}
                    </MuiToggleButton>
                ))}
            </MuiToggleButtonGroup>
        ),
    };

    c = useComponent(def, params);
    m = c.model;
    return c;
};

export type ToggleButtonGroupStruct = Struct;

export const ToggleButtonGroup = toReact(useToggleButtonGroup);
ToggleButtonGroup.displayName = 'ToggleButtonGroup';
