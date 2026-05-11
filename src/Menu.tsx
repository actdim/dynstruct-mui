import React from 'react';
import {
    Menu as MuiMenu,
    MenuItem as MuiMenuItem,
    Divider,
    type MenuProps as MuiMenuProps,
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

export type MenuItemDef = {
    label: string;
    onClick?: () => void;
    disabled?: boolean;
    divider?: boolean;
};

type Struct<TMsgStruct extends BaseAppMsgStruct = BaseAppMsgStruct> = ComponentStruct<
    TMsgStruct,
    {
        props: {
            open: boolean;
            onClose: () => void;
            items: MenuItemDef[];
            anchorEl?: HTMLElement | null;
            sx?: MuiMenuProps['sx'];
        };
    }
>;

export const useMenu = (params: ComponentParams<Struct>): Component<Struct> => {
    let c: Component<Struct>;
    let m: ComponentModel<Struct>;

    const def: ComponentDef<Struct> = {
        regType: 'Menu',
        props: {
            open: false,
            onClose: () => {},
            items: [],
            anchorEl: null,
            sx: undefined,
        },
        view: () => (
            <MuiMenu open={m.open} onClose={m.onClose} anchorEl={m.anchorEl} sx={m.sx}>
                {m.items.map((item, i) =>
                    item.divider ? (
                        <Divider key={i} />
                    ) : (
                        <MuiMenuItem
                            key={i}
                            onClick={() => {
                                item.onClick?.();
                                m.onClose();
                            }}
                            disabled={item.disabled}
                        >
                            {item.label}
                        </MuiMenuItem>
                    ),
                )}
            </MuiMenu>
        ),
    };

    c = useComponent(def, params);
    m = c.model;
    return c;
};

export type MenuStruct = Struct;

export const Menu = toReact(useMenu);
Menu.displayName = 'Menu';
