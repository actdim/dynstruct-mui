import React from 'react';
import { Fab as MuiFab, type FabProps as MuiFabProps } from '@mui/material';
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
            icon: React.FC;
            onClick: () => void;
            ariaLabel: string;
            color?: MuiFabProps['color'];
            size?: MuiFabProps['size'];
            variant?: MuiFabProps['variant'];
            label?: string;
            sx?: MuiFabProps['sx'];
        };
    }
>;

export const useFab = (params: ComponentParams<Struct>): Component<Struct> => {
    let c: Component<Struct>;
    let m: ComponentModel<Struct>;

    const def: ComponentDef<Struct> = {
        regType: 'Fab',
        props: {
            icon: () => null,
            onClick: () => {},
            ariaLabel: '',
            color: 'primary',
            size: 'large',
            variant: 'circular',
            label: undefined,
            sx: undefined,
        },
        view: () => (
            <MuiFab
                color={m.color}
                size={m.size}
                variant={m.variant}
                aria-label={m.ariaLabel}
                disabled={m.$.isDisabled}
                onClick={m.onClick}
                sx={m.sx}
            >
                <m.icon />
                {m.variant === 'extended' && m.label}
            </MuiFab>
        ),
    };

    c = useComponent(def, params);
    m = c.model;
    return c;
};

export type FabStruct = Struct;

export const Fab = toReact(useFab);
Fab.displayName = 'Fab';
