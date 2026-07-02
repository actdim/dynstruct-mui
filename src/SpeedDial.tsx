import React from 'react';
import {
    SpeedDial as MuiSpeedDial,
    SpeedDialAction,
    SpeedDialIcon,
    type SpeedDialProps as MuiSpeedDialProps,
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

export type SpeedDialActionDef = {
    name: string;
    icon: React.FC;
    onClick?: () => void;
};

type Struct<TMsgStruct extends BaseAppMsgStruct = BaseAppMsgStruct> = ComponentStruct<
    TMsgStruct,
    {
        props: {
            ariaLabel: string;
            actions: SpeedDialActionDef[];
            icon?: React.FC;
            direction?: MuiSpeedDialProps['direction'];
            hidden?: boolean;
            sx?: MuiSpeedDialProps['sx'];
        };
    }
>;

export const useSpeedDial = (params: ComponentParams<Struct>): Component<Struct> => {
    let c: Component<Struct>;
    let m: ComponentModel<Struct>;

    const def: ComponentDef<Struct> = {
        regType: 'SpeedDial',
        props: {
            ariaLabel: '',
            actions: [],
            icon: undefined,
            direction: 'up',
            hidden: false,
            sx: undefined,
        },
        view: () => (
            <MuiSpeedDial
                ariaLabel={m.ariaLabel}
                icon={m.icon ? <m.icon /> : <SpeedDialIcon />}
                direction={m.direction}
                hidden={m.hidden}
                sx={m.sx}
            >
                {m.actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={<action.icon />}
                        title={action.name}
                        onClick={action.onClick}
                    />
                ))}
            </MuiSpeedDial>
        ),
    };

    c = useComponent(def, params);
    m = c.model;
    return c;
};

export type SpeedDialStruct = Struct;

export const SpeedDial = toReact(useSpeedDial);
SpeedDial.displayName = 'SpeedDial';
