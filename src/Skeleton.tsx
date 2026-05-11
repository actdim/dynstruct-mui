import React from 'react';
import { Skeleton as MuiSkeleton, type SkeletonProps as MuiSkeletonProps } from '@mui/material';
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
            variant?: MuiSkeletonProps['variant'];
            width?: number | string;
            height?: number | string;
            animation?: MuiSkeletonProps['animation'];
            sx?: MuiSkeletonProps['sx'];
        };
    }
>;

export const useSkeleton = (params: ComponentParams<Struct>): Component<Struct> => {
    let c: Component<Struct>;
    let m: ComponentModel<Struct>;

    const def: ComponentDef<Struct> = {
        regType: 'Skeleton',
        props: {
            variant: 'text',
            width: undefined,
            height: undefined,
            animation: 'pulse',
            sx: undefined,
        },
        view: () => (
            <MuiSkeleton
                variant={m.variant}
                width={m.width}
                height={m.height}
                animation={m.animation}
                sx={m.sx}
            />
        ),
    };

    c = useComponent(def, params);
    m = c.model;
    return c;
};

export type SkeletonStruct = Struct;

export const Skeleton = toReact(useSkeleton);
Skeleton.displayName = 'Skeleton';
