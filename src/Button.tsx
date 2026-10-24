import React from 'react';
import { Button as MuiButton, type ButtonProps as MuiButtonProps } from '@mui/material';
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
            label: React.ReactNode;
            onClick: (e: React.MouseEvent<HTMLElement>) => void;
            /** Renders a link: plain click navigates in place (APP.NAV.GOTO), modified / middle click opens natively */
            href?: string;
            target?: string;
            /** Called before an in-place link navigation (plain click on `href` only) */
            onNavigate?: () => void;
            variant?: MuiButtonProps['variant'];
            color?: MuiButtonProps['color'];
            size?: MuiButtonProps['size'];
            fullWidth?: boolean;
            startIcon?: React.ReactNode;
            endIcon?: React.ReactNode;
            loading?: boolean;
            disabled?: boolean;
            sx?: MuiButtonProps['sx'];
        };
        msgScope: {
            // href links navigate through the bus
            publish: BaseAppMsgChannels<'APP.NAV.GOTO'>;
        };
    }
>;

export const useButton = (params: ComponentParams<Struct>): Component<Struct> => {
    let c: Component<Struct>;
    let m: ComponentModel<Struct>;

    const def: ComponentDef<Struct> = {
        regType: 'Button',
        props: {
            label: prop({ initialValue: '', reactive: 'ref' }),
            onClick: () => {},
            href: undefined,
            target: undefined,
            onNavigate: undefined,
            variant: 'text',
            color: 'primary',
            size: 'medium',
            fullWidth: false,
            startIcon: prop({ reactive: 'ref' }),
            endIcon: prop({ reactive: 'ref' }),
            loading: false,
            disabled: false,
            sx: undefined,
        },
        view: () => (
            <MuiButton
                variant={m.variant}
                color={m.color}
                size={m.size}
                fullWidth={m.fullWidth}
                disabled={m.disabled || m.$.isDisabled}
                loading={m.loading}
                startIcon={m.startIcon}
                endIcon={m.endIcon}
                sx={m.sx}
                href={m.href}
                target={m.target}
                onClick={(e: React.MouseEvent<HTMLElement>) => {
                    m.onClick(e);
                    handleNavLinkClick(e, c.msgBus, m.href, { target: m.target, onNavigate: m.onNavigate });
                }}
            >
                {m.label}
            </MuiButton>
        ),
    };

    c = useComponent(def, params);
    m = c.model;

    return c;
};

export type ButtonStruct = Struct;

export const Button = toReact(useButton);
Button.displayName = 'Button';
