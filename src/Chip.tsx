import React from 'react';
import { Chip as MuiChip, type ChipProps as MuiChipProps } from '@mui/material';
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
            label: string;
            onClick?: () => void;
            onDelete?: () => void;
            variant?: MuiChipProps['variant'];
            color?: MuiChipProps['color'];
            size?: MuiChipProps['size'];
            icon?: React.ReactNode;
            sx?: MuiChipProps['sx'];
        };
    }
>;

export const useChip = (params: ComponentParams<Struct>): Component<Struct> => {
    let c: Component<Struct>;
    let m: ComponentModel<Struct>;

    const def: ComponentDef<Struct> = {
        regType: 'Chip',
        props: {
            label: '',
            onClick: undefined,
            onDelete: undefined,
            variant: 'filled',
            color: 'default',
            size: 'medium',
            icon: undefined,
            sx: undefined,
        },
        view: () => (
            <MuiChip
                label={m.label}
                onClick={m.onClick}
                onDelete={m.onDelete}
                variant={m.variant}
                color={m.color}
                size={m.size}
                icon={m.icon as React.ReactElement | undefined}
                disabled={m.$.isDisabled}
                sx={m.sx}
            />
        ),
    };

    c = useComponent(def, params);
    m = c.model;
    return c;
};

export type ChipStruct = Struct;

export const Chip = toReact(useChip);
Chip.displayName = 'Chip';
