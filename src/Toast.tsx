import React from 'react';
import {
    Snackbar as MuiSnackbar,
    Alert as MuiAlert,
    AlertTitle as MuiAlertTitle,
    Collapse,
    type SnackbarProps as MuiSnackbarProps,
    type AlertProps as MuiAlertProps,
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

export type ToastItem = {
    id: string;
    message: string;
    title?: string;
    severity?: MuiAlertProps['severity'];
    variant?: MuiAlertProps['variant'];
    autoHideDuration?: number | null;
    action?: React.ReactNode;
    alertSx?: MuiAlertProps['sx'];
};

type Struct<TMsgStruct extends BaseAppMsgStruct = BaseAppMsgStruct> = ComponentStruct<
    TMsgStruct,
    {
        props: {
            // Stack mode
            items?: ToastItem[];
            onDismiss?: (id: string) => void;

            // Single toast mode
            open?: boolean;
            onClose?: () => void;
            message?: string;
            title?: string;
            severity?: MuiAlertProps['severity'];
            variant?: MuiAlertProps['variant'];
            autoHideDuration?: number | null;
            anchorOrigin?: MuiSnackbarProps['anchorOrigin'];
            action?: React.ReactNode;
            sx?: MuiSnackbarProps['sx'];
            alertSx?: MuiAlertProps['sx'];
        };
    }
>;

type ToastItemProps = {
    item: ToastItem;
    onDismiss: (id: string) => void;
};

const ToastItemView: React.FC<ToastItemProps> = ({ item, onDismiss }) => {
    React.useEffect(() => {
        const duration = item.autoHideDuration ?? 5000;
        if (duration > 0) {
            const timer = setTimeout(() => {
                onDismiss(item.id);
            }, duration);
            return () => {
                clearTimeout(timer);
            };
        }
        return undefined;
    }, [item.id, item.autoHideDuration, onDismiss]);

    return (
        <Collapse in={true}>
            <div style={{ pointerEvents: 'auto' }}>
                <MuiAlert
                    onClose={() => {
                        onDismiss(item.id);
                    }}
                    severity={item.severity || 'info'}
                    variant={item.variant || 'filled'}
                    sx={{
                        width: '100%',
                        minWidth: '300px',
                        boxShadow: 4,
                        ...item.alertSx,
                    }}
                    action={item.action}
                >
                    {item.title ? <MuiAlertTitle>{item.title}</MuiAlertTitle> : null}
                    {item.message}
                </MuiAlert>
            </div>
        </Collapse>
    );
};

export const useToast = (params: ComponentParams<Struct>): Component<Struct> => {
    let c: Component<Struct>;
    let m: ComponentModel<Struct>;

    const def: ComponentDef<Struct> = {
        regType: 'Toast',
        props: {
            items: undefined,
            onDismiss: undefined,
            open: false,
            onClose: () => {},
            message: '',
            title: undefined,
            severity: 'info',
            variant: 'filled',
            autoHideDuration: 5000,
            anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
            action: undefined,
            sx: undefined,
            alertSx: undefined,
        },
        view: () => {
            if (m.items && m.items.length > 0) {
                const vertical = m.anchorOrigin?.vertical || 'bottom';
                const horizontal = m.anchorOrigin?.horizontal || 'right';

                const positionStyle: React.CSSProperties = {
                    position: 'fixed',
                    zIndex: 2000,
                    display: 'flex',
                    flexDirection: vertical === 'top' ? 'column' : 'column-reverse',
                    gap: 8,
                    maxWidth: '420px',
                    width: 'calc(100% - 32px)',
                    pointerEvents: 'none',
                    top: vertical === 'top' ? 16 : undefined,
                    bottom: vertical === 'bottom' ? 16 : undefined,
                    left: horizontal === 'left' ? 16 : horizontal === 'center' ? '50%' : undefined,
                    right: horizontal === 'right' ? 16 : undefined,
                    transform: horizontal === 'center' ? 'translateX(-50%)' : undefined,
                };

                return (
                    <div style={positionStyle}>
                        {m.items.map((item) => {
                            return (
                                <ToastItemView
                                    key={item.id}
                                    item={item}
                                    onDismiss={(id) => {
                                        if (m.onDismiss) {
                                            m.onDismiss(id);
                                        }
                                    }}
                                />
                            );
                        })}
                    </div>
                );
            }

            return (
                <MuiSnackbar
                    open={m.open}
                    onClose={(_, reason) => {
                        if (reason === 'clickaway') {
                            return;
                        }
                        if (m.onClose) {
                            m.onClose();
                        }
                    }}
                    autoHideDuration={m.autoHideDuration}
                    anchorOrigin={m.anchorOrigin}
                    action={m.action}
                    sx={m.sx}
                >
                    <MuiAlert
                        onClose={m.onClose}
                        severity={m.severity}
                        variant={m.variant}
                        sx={{ width: '100%', minWidth: '280px', ...m.alertSx }}
                    >
                        {m.title ? <MuiAlertTitle>{m.title}</MuiAlertTitle> : null}
                        {m.message}
                    </MuiAlert>
                </MuiSnackbar>
            );
        },
    };

    c = useComponent(def, params);
    m = c.model;
    return c;
};

export type ToastStruct = Struct;

export const Toast = toReact(useToast);
Toast.displayName = 'Toast';
