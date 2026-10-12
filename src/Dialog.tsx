import React from 'react';
import {
    Dialog as MuiDialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    type DialogProps as MuiDialogProps,
} from '@mui/material';
import {
    type ComponentStruct,
    type ComponentDef,
    type ComponentParams,
    type Component,
    type ComponentModel,
} from '@actdim/dynstruct/componentModel/contracts';
import { useComponent, toReact } from '@actdim/dynstruct/componentModel/react/hooks';
import { prop } from '@actdim/dynstruct/componentModel/core';
import { type BaseAppMsgStruct } from '@actdim/dynstruct/appDomain/appContracts';

type Struct<TMsgStruct extends BaseAppMsgStruct = BaseAppMsgStruct> = ComponentStruct<
    TMsgStruct,
    {
        props: {
            open: boolean;
            onClose: () => void;
            title?: React.ReactNode;
            subtitle?: React.ReactNode;
            content?: React.FC;
            actions?: React.FC;
            maxWidth?: MuiDialogProps['maxWidth'];
            fullWidth?: boolean;
            fullScreen?: boolean;
            sx?: MuiDialogProps['sx'];
        };
    }
>;

export const useDialog = (params: ComponentParams<Struct>): Component<Struct> => {
    let c: Component<Struct>;
    let m: ComponentModel<Struct>;

    const def: ComponentDef<Struct> = {
        regType: 'Dialog',
        props: {
            open: false,
            onClose: () => {},
            title: prop({ reactive: 'ref' }),
            subtitle: prop({ reactive: 'ref' }),
            content: prop({ reactive: 'ref' }),
            actions: prop({ reactive: 'ref' }),
            maxWidth: 'sm',
            fullWidth: true,
            fullScreen: false,
            sx: undefined,
        },
        view: () => (
            <MuiDialog
                open={m.open}
                onClose={m.onClose}
                maxWidth={m.maxWidth}
                fullWidth={m.fullWidth}
                fullScreen={m.fullScreen}
                sx={m.sx}
            >
                {m.title && (
                    <DialogTitle>
                        <div>{m.title}</div>
                        {m.subtitle && (
                            <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 400, marginTop: 4 }}>
                                {m.subtitle}
                            </div>
                        )}
                    </DialogTitle>
                )}
                {m.content && (
                    <DialogContent>
                        <m.content />
                    </DialogContent>
                )}
                {m.actions && (
                    <DialogActions>
                        <m.actions />
                    </DialogActions>
                )}
            </MuiDialog>
        ),
    };

    c = useComponent(def, params);
    m = c.model;

    return c;
};

export type DialogStruct = Struct;

export const Dialog = toReact(useDialog);
Dialog.displayName = 'Dialog';
