import React from 'react';
import {
    CircularProgress as MuiCircularProgress,
    type CircularProgressProps as MuiCircularProgressProps,
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
            variant?: MuiCircularProgressProps['variant'];
            value?: number;
            color?: MuiCircularProgressProps['color'];
            size?: number | string;
            thickness?: number;
            sx?: MuiCircularProgressProps['sx'];
        };
    }
>;

export const useCircularProgress = (params: ComponentParams<Struct>): Component<Struct> => {
    let c: Component<Struct>;
    let m: ComponentModel<Struct>;

    const def: ComponentDef<Struct> = {
        regType: 'CircularProgress',
        props: {
            variant: 'indeterminate',
            value: undefined,
            color: 'primary',
            size: 40,
            thickness: 3.6,
            sx: undefined,
        },
        view: () => (
            <MuiCircularProgress
                variant={m.variant}
                value={m.value}
                color={m.color}
                size={m.size}
                thickness={m.thickness}
                sx={m.sx}
            />
        ),
    };

    c = useComponent(def, params);
    m = c.model;
    return c;
};

export type CircularProgressStruct = Struct;

export const CircularProgress = toReact(useCircularProgress);
CircularProgress.displayName = 'CircularProgress';
