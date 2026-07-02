import React from 'react';
import { Badge as MuiBadge, type BadgeProps as MuiBadgeProps } from '@mui/material';
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
            children: React.FC;
            badgeContent?: React.ReactNode;
            color?: MuiBadgeProps['color'];
            variant?: MuiBadgeProps['variant'];
            max?: number;
            invisible?: boolean;
            anchorOrigin?: MuiBadgeProps['anchorOrigin'];
            sx?: MuiBadgeProps['sx'];
        };
    }
>;

export const useBadge = (params: ComponentParams<Struct>): Component<Struct> => {
    let c: Component<Struct>;
    let m: ComponentModel<Struct>;

    const def: ComponentDef<Struct> = {
        regType: 'Badge',
        props: {
            children: () => null,
            badgeContent: undefined,
            color: 'default',
            variant: 'standard',
            max: 99,
            invisible: false,
            anchorOrigin: undefined,
            sx: undefined,
        },
        view: () => (
            <MuiBadge
                badgeContent={m.badgeContent}
                color={m.color}
                variant={m.variant}
                max={m.max}
                invisible={m.invisible}
                anchorOrigin={m.anchorOrigin}
                sx={m.sx}
            >
                <m.children />
            </MuiBadge>
        ),
    };

    c = useComponent(def, params);
    m = c.model;
    return c;
};

export type BadgeStruct = Struct;

export const Badge = toReact(useBadge);
Badge.displayName = 'Badge';
