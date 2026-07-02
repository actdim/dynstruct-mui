import React from 'react';
import {
    LinearProgress as MuiLinearProgress,
    type LinearProgressProps as MuiLinearProgressProps,
} from '@mui/material';
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
            variant?: MuiLinearProgressProps['variant'];
            value?: number;
            valueBuffer?: number;
            color?: MuiLinearProgressProps['color'];
            sx?: MuiLinearProgressProps['sx'];
        };
    }
>;

export const useLinearProgress = (params: ComponentParams<Struct>): Component<Struct> => {
    let c: Component<Struct>;
    let m: ComponentModel<Struct>;

    const def: ComponentDef<Struct> = {
        regType: 'LinearProgress',
        props: {
            variant: 'indeterminate',
            value: undefined,
            valueBuffer: undefined,
            color: 'primary',
            sx: undefined,
        },
        view: () => (
            <MuiLinearProgress
                variant={m.variant}
                value={m.value}
                valueBuffer={m.valueBuffer}
                color={m.color}
                sx={m.sx}
            />
        ),
    };

    c = useComponent(def, params);
    m = c.model;
    return c;
};

export type LinearProgressStruct = Struct;

export const LinearProgress = toReact(useLinearProgress);
LinearProgress.displayName = 'LinearProgress';
