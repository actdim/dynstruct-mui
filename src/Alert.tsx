import React from 'react';
import { Alert as MuiAlert, type AlertProps as MuiAlertProps } from '@mui/material';
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
            message: string;
            severity?: MuiAlertProps['severity'];
            variant?: MuiAlertProps['variant'];
            onClose?: () => void;
            sx?: MuiAlertProps['sx'];
        };
    }
>;

export const useAlert = (params: ComponentParams<Struct>): Component<Struct> => {
    let c: Component<Struct>;
    let m: ComponentModel<Struct>;

    const def: ComponentDef<Struct> = {
        regType: 'Alert',
        props: {
            message: '',
            severity: 'info',
            variant: 'standard',
            onClose: undefined,
            sx: undefined,
        },
        view: () => (
            <MuiAlert
                severity={m.severity}
                variant={m.variant}
                onClose={m.onClose}
                sx={m.sx}
            >
                {m.message}
            </MuiAlert>
        ),
    };

    c = useComponent(def, params);
    m = c.model;
    return c;
};

export type AlertStruct = Struct;

export const Alert = toReact(useAlert);
Alert.displayName = 'Alert';
