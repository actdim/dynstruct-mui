import React from 'react';
import { IconButton as MuiIconButton, type IconButtonProps as MuiIconButtonProps } from '@mui/material';
import {
    type ComponentStruct,
    type ComponentDef,
    type ComponentParams,
    type Component,
    type ComponentModel,
} from '@actdim/dynstruct/componentModel/contracts';
import { useComponent, toReact } from '@actdim/dynstruct/componentModel/react/hooks';
import { prop } from '@actdim/dynstruct/componentModel/core';
import { type BaseAppMsgStruct, type BaseAppMsgChannels } from '@actdim/dynstruct/appDomain/appContracts';
import { handleNavLinkClick } from '@actdim/dynstruct/services/react/NavLink';

type Struct<TMsgStruct extends BaseAppMsgStruct = BaseAppMsgStruct> = ComponentStruct<
    TMsgStruct,
    {
        props: {
            onClick: (e: React.MouseEvent<HTMLElement>) => void;
            /** Renders a link: plain click navigates in place (APP.NAV.GOTO), modified / middle click opens natively */
            href?: string;
            target?: string;
            /** Called before an in-place link navigation (plain click on `href` only) */
            onNavigate?: () => void;
            icon: React.ReactNode;
            title?: string;
            disabled?: boolean;
            color?: MuiIconButtonProps['color'];
            size?: MuiIconButtonProps['size'];
            edge?: MuiIconButtonProps['edge'];
            loading?: boolean;
            'aria-label'?: string;
            sx?: MuiIconButtonProps['sx'];
        };
        msgScope: {
            // href links navigate through the bus
            publish: BaseAppMsgChannels<'APP.NAV.GOTO'>;
        };
    }
>;

export const useIconButton = (params: ComponentParams<Struct>): Component<Struct> => {
    let c: Component<Struct>;
    let m: ComponentModel<Struct>;

    const def: ComponentDef<Struct> = {
        regType: 'IconButton',
        props: {
            onClick: () => {},
            href: undefined,
            target: undefined,
            onNavigate: undefined,
            icon: prop({ initialValue: null, reactive: 'ref' }),
            title: undefined,
            disabled: false,
            color: 'default',
            size: 'medium',
            edge: false,
            loading: false,
            'aria-label': undefined,
            sx: undefined,
        },
        view: () => (
            <MuiIconButton
                {...(m.href ? { href: m.href, target: m.target } : {})}
                onClick={(e: React.MouseEvent<HTMLElement>) => {
                    m.onClick(e);
                    handleNavLinkClick(e, c.msgBus, m.href, { target: m.target, onNavigate: m.onNavigate });
                }}
                title={m.title}
                color={m.color}
                size={m.size}
                edge={m.edge}
                loading={m.loading}
                disabled={m.disabled || m.$.isDisabled}
                aria-label={m['aria-label'] || m.title}
                sx={m.sx}
            >
                {m.icon}
            </MuiIconButton>
        ),
    };

    c = useComponent(def, params);
    m = c.model;

    return c;
};

export type IconButtonStruct = Struct;

export const IconButton = toReact(useIconButton);
IconButton.displayName = 'IconButton';
