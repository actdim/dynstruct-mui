import React from 'react';
import {
    List as MuiList,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    type ListProps as MuiListProps,
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

export type ListItemDef = {
    primary: React.ReactNode;
    secondary?: React.ReactNode;
    icon?: React.FC;
    onClick?: () => void;
    divider?: boolean;
    disabled?: boolean;
};

type Struct<TMsgStruct extends BaseAppMsgStruct = BaseAppMsgStruct> = ComponentStruct<
    TMsgStruct,
    {
        props: {
            items: ListItemDef[];
            dense?: boolean;
            disablePadding?: boolean;
            sx?: MuiListProps['sx'];
        };
    }
>;

export const useList = (params: ComponentParams<Struct>): Component<Struct> => {
    let c: Component<Struct>;
    let m: ComponentModel<Struct>;

    const def: ComponentDef<Struct> = {
        regType: 'List',
        props: {
            items: [],
            dense: false,
            disablePadding: false,
            sx: undefined,
        },
        view: () => (
            <MuiList dense={m.dense} disablePadding={m.disablePadding} sx={m.sx}>
                {m.items.map((item, i) =>
                    item.divider ? (
                        <Divider key={i} component="li" />
                    ) : item.onClick ? (
                        <ListItem key={i} disablePadding>
                            <ListItemButton onClick={item.onClick} disabled={item.disabled}>
                                {item.icon && (
                                    <ListItemIcon>
                                        <item.icon />
                                    </ListItemIcon>
                                )}
                                <ListItemText primary={item.primary} secondary={item.secondary} />
                            </ListItemButton>
                        </ListItem>
                    ) : (
                        <ListItem key={i}>
                            {item.icon && (
                                <ListItemIcon>
                                    <item.icon />
                                </ListItemIcon>
                            )}
                            <ListItemText primary={item.primary} secondary={item.secondary} />
                        </ListItem>
                    ),
                )}
            </MuiList>
        ),
    };

    c = useComponent(def, params);
    m = c.model;
    return c;
};

export type ListStruct = Struct;

export const List = toReact(useList);
List.displayName = 'List';
