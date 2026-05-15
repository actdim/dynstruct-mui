import React from 'react';
import { Tooltip as MuiTooltip, type TooltipProps as MuiTooltipProps } from '@mui/material';
import {
    type ComponentStruct,
    type ComponentDef,
    type ComponentParams,
    type Component,
    type ComponentModel,
} from '@actdim/dynstruct/componentModel/contracts';
import { useComponent, toReact } from '@actdim/dynstruct/componentModel/react/react';
import { type BaseAppMsgStruct } from '@actdim/dynstruct/appDomain/appContracts';
import { KeyPath } from '@actdim/utico/typeCore';

type Struct<TMsgStruct extends BaseAppMsgStruct = BaseAppMsgStruct> = ComponentStruct<
    TMsgStruct,
    {
        props: {
            title: React.ReactNode;
            children: React.FC;
            placement?: MuiTooltipProps['placement'];
            arrow?: boolean;
        };
    }
>;

export const useTooltip = (params: ComponentParams<Struct>): Component<Struct> => {
    let c: Component<Struct>;
    let m: ComponentModel<Struct>;

    const def: ComponentDef<Struct> = {
        regType: 'Tooltip',
        props: {
            title: '',
            children: () => null,
            placement: 'bottom',
            arrow: false,
        },
        view: () => (
            <MuiTooltip title={m.title} placement={m.placement} arrow={m.arrow}>
                <span>
                    <m.children />
                </span>
            </MuiTooltip>
        ),
    };

    c = useComponent(def, params);
    m = c.model;
    return c;
};

export type TooltipStruct = Struct;

export const Tooltip = toReact(useTooltip);
Tooltip.displayName = 'Tooltip';
