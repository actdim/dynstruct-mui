import React from 'react';
import { Avatar as MuiAvatar, type AvatarProps as MuiAvatarProps } from '@mui/material';
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
            src?: string;
            alt?: string;
            children?: React.ReactNode;
            variant?: MuiAvatarProps['variant'];
            sx?: MuiAvatarProps['sx'];
        };
    }
>;

export const useAvatar = (params: ComponentParams<Struct>): Component<Struct> => {
    let c: Component<Struct>;
    let m: ComponentModel<Struct>;

    const def: ComponentDef<Struct> = {
        regType: 'Avatar',
        props: {
            src: undefined,
            alt: undefined,
            children: undefined,
            variant: 'circular',
            sx: undefined,
        },
        view: () => (
            <MuiAvatar src={m.src} alt={m.alt} variant={m.variant} sx={m.sx}>
                {m.children}
            </MuiAvatar>
        ),
    };

    c = useComponent(def, params);
    m = c.model;
    return c;
};

export type AvatarStruct = Struct;

export const Avatar = toReact(useAvatar);
Avatar.displayName = 'Avatar';
