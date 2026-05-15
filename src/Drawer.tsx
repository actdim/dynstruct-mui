import React from 'react';
import { Drawer as MuiDrawer, type DrawerProps as MuiDrawerProps } from '@mui/material';
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
            open: boolean;
            onClose: () => void;
            children: React.FC;
            anchor?: MuiDrawerProps['anchor'];
            variant?: MuiDrawerProps['variant'];
            sx?: MuiDrawerProps['sx'];
        };
    }
>;

export const useDrawer = (params: ComponentParams<Struct>): Component<Struct> => {
    let c: Component<Struct>;
    let m: ComponentModel<Struct>;

    const def: ComponentDef<Struct> = {
        regType: 'Drawer',
        props: {
            open: false,
            onClose: () => {},
            children: () => null,
            anchor: 'left',
            variant: 'temporary',
            sx: undefined,
        },
        view: () => (
            <MuiDrawer
                open={m.open}
                onClose={m.onClose}
                anchor={m.anchor}
                variant={m.variant}
                sx={m.sx}
            >
                <m.children />
            </MuiDrawer>
        ),
    };

    c = useComponent(def, params);
    m = c.model;
    return c;
};

export type DrawerStruct = Struct;

export const Drawer = toReact(useDrawer);
Drawer.displayName = 'Drawer';
