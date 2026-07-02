import React from 'react';
import {
    Card as MuiCard,
    CardHeader,
    CardContent,
    CardActions,
    type CardProps as MuiCardProps,
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
            content: React.FC;
            title?: React.ReactNode;
            subheader?: React.ReactNode;
            avatar?: React.ReactNode;
            headerAction?: React.FC;
            actions?: React.FC;
            raised?: boolean;
            sx?: MuiCardProps['sx'];
        };
    }
>;

export const useCard = (params: ComponentParams<Struct>): Component<Struct> => {
    let c: Component<Struct>;
    let m: ComponentModel<Struct>;

    const def: ComponentDef<Struct> = {
        regType: 'Card',
        props: {
            content: () => null,
            title: undefined,
            subheader: undefined,
            avatar: undefined,
            headerAction: undefined,
            actions: undefined,
            raised: false,
            sx: undefined,
        },
        view: () => (
            <MuiCard raised={m.raised} sx={m.sx}>
                {(m.title || m.subheader || m.avatar || m.headerAction) && (
                    <CardHeader
                        title={m.title}
                        subheader={m.subheader}
                        avatar={m.avatar}
                        action={m.headerAction ? <m.headerAction /> : undefined}
                    />
                )}
                <CardContent>
                    <m.content />
                </CardContent>
                {m.actions && (
                    <CardActions>
                        <m.actions />
                    </CardActions>
                )}
            </MuiCard>
        ),
    };

    c = useComponent(def, params);
    m = c.model;
    return c;
};

export type CardStruct = Struct;

export const Card = toReact(useCard);
Card.displayName = 'Card';
