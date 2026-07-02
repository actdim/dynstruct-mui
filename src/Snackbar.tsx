import React from 'react';
import {
    Snackbar as MuiSnackbar,
    type SnackbarProps as MuiSnackbarProps,
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
            open: boolean;
            onClose: () => void;
            message: string;
            autoHideDuration?: number | null;
            anchorOrigin?: MuiSnackbarProps['anchorOrigin'];
            action?: React.ReactNode;
            sx?: MuiSnackbarProps['sx'];
        };
    }
>;

export const useSnackbar = (params: ComponentParams<Struct>): Component<Struct> => {
    let c: Component<Struct>;
    let m: ComponentModel<Struct>;

    const def: ComponentDef<Struct> = {
        regType: 'Snackbar',
        props: {
            open: false,
            onClose: () => {},
            message: '',
            autoHideDuration: 4000,
            anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
            action: undefined,
            sx: undefined,
        },
        view: () => (
            <MuiSnackbar
                open={m.open}
                onClose={m.onClose}
                message={m.message}
                autoHideDuration={m.autoHideDuration}
                anchorOrigin={m.anchorOrigin}
                action={m.action}
                sx={m.sx}
            />
        ),
    };

    c = useComponent(def, params);
    m = c.model;
    return c;
};

export type SnackbarStruct = Struct;

export const Snackbar = toReact(useSnackbar);
Snackbar.displayName = 'Snackbar';
