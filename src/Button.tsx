import React from 'react';
import { Button as MuiButton, type ButtonProps as MuiButtonProps } from '@mui/material';
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
            label: string;
            onClick: () => void;
            variant?: MuiButtonProps['variant'];
            color?: MuiButtonProps['color'];
            size?: MuiButtonProps['size'];
            fullWidth?: boolean;
            startIcon?: React.ReactNode;
            endIcon?: React.ReactNode;
            loading?: boolean;
            sx?: MuiButtonProps['sx'];
        };
    }
>;

export const useButton = (params: ComponentParams<Struct>): Component<Struct> => {
    let c: Component<Struct>;
    let m: ComponentModel<Struct>;

    const def: ComponentDef<Struct> = {
        regType: 'Button',
        props: {
            label: '',
            onClick: () => {},
            variant: 'contained',
            color: 'primary',
            size: 'medium',
            fullWidth: false,
            startIcon: undefined,
            endIcon: undefined,
            loading: false,
            sx: undefined,
        },
        view: () => (
            <MuiButton
                variant={m.variant}
                color={m.color}
                size={m.size}
                fullWidth={m.fullWidth}
                disabled={m.$.isDisabled}
                loading={m.loading}
                startIcon={m.startIcon}
                endIcon={m.endIcon}
                sx={m.sx}
                onClick={m.onClick}
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
