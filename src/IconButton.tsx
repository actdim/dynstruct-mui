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
import { type BaseAppMsgStruct } from '@actdim/dynstruct/appDomain/appContracts';

type Struct<TMsgStruct extends BaseAppMsgStruct = BaseAppMsgStruct> = ComponentStruct<
    TMsgStruct,
    {
        props: {
            onClick: () => void;
            icon: React.ReactNode;
            color?: MuiIconButtonProps['color'];
            size?: MuiIconButtonProps['size'];
            edge?: MuiIconButtonProps['edge'];
            loading?: boolean;
            'aria-label'?: string;
            sx?: MuiIconButtonProps['sx'];
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
            icon: null,
            color: 'default',
            size: 'medium',
            edge: false,
            loading: false,
            'aria-label': undefined,
            sx: undefined,
        },
        view: () => (
            <MuiIconButton
                onClick={m.onClick}
                color={m.color}
                size={m.size}
                edge={m.edge}
                loading={m.loading}
                disabled={m.$.isDisabled}
                aria-label={m['aria-label']}
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
