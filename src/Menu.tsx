import React from 'react';
import {
    Menu as MuiMenu,
    MenuItem as MuiMenuItem,
    ListItemIcon,
    ListItemText,
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
import { useComponent, toReact } from '@actdim/dynstruct/componentModel/react/hooks';
import { prop } from '@actdim/dynstruct/componentModel/core';
import { type BaseAppMsgStruct } from '@actdim/dynstruct/appDomain/appContracts';

export type MenuItemDef = {
    id?: string;
    label: React.ReactNode;
    icon?: React.ReactNode;
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
            anchorPosition?: { top: number; left: number };
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
            // items carry React content (label / icon): stored by reference, replace the array to update
            items: prop({ initialValue: [], reactive: 'ref' }),
            anchorEl: null,
            anchorPosition: undefined,
            sx: undefined,
        },
        view: () => {
            const anchorReference = m.anchorPosition ? 'anchorPosition' : 'anchorEl';

            return (
                <MuiMenu
                    open={m.open}
                    onClose={m.onClose}
                    anchorEl={m.anchorEl}
                    anchorReference={anchorReference}
                    anchorPosition={m.anchorPosition}
                    sx={m.sx}
                >
                    {m.items.map((item, i) => {
                        if (item.divider) {
                            return <Divider key={item.id ?? i} />;
                        }

                        return (
                            <MuiMenuItem
                                key={item.id ?? i}
                                onClick={() => {
                                    if (item.onClick) {
                                        item.onClick();
                                    }
                                    m.onClose();
                                }}
                                disabled={item.disabled}
                            >
                                {item.icon && (
                                    <ListItemIcon sx={{ minWidth: 32 }}>
                                        {item.icon}
                                    </ListItemIcon>
                                )}
                                <ListItemText primary={item.label} />
                            </MuiMenuItem>
                        );
                    })}
                </MuiMenu>
            );
        },
    };

    c = useComponent(def, params);
    m = c.model;

    return c;
};

export type MenuStruct = Struct;

export const Menu = toReact(useMenu);
Menu.displayName = 'Menu';
