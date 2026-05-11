import React from 'react';
import { Pagination as MuiPagination, type PaginationProps as MuiPaginationProps } from '@mui/material';
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
            count: number;
            page: number;
            onChange: (page: number) => void;
            size?: MuiPaginationProps['size'];
            color?: MuiPaginationProps['color'];
            shape?: MuiPaginationProps['shape'];
            variant?: MuiPaginationProps['variant'];
            sx?: MuiPaginationProps['sx'];
        };
    }
>;

export const usePagination = (params: ComponentParams<Struct>): Component<Struct> => {
    let c: Component<Struct>;
    let m: ComponentModel<Struct>;

    const def: ComponentDef<Struct> = {
        regType: 'Pagination',
        props: {
            count: 1,
            page: 1,
            onChange: () => {},
            size: 'medium',
            color: 'standard',
            shape: 'circular',
            variant: 'text',
            sx: undefined,
        },
        view: () => (
            <MuiPagination
                count={m.count}
                page={m.page}
                onChange={(_, page) => m.onChange(page)}
                size={m.size}
                color={m.color}
                shape={m.shape}
                variant={m.variant}
                disabled={m.$.isDisabled}
                sx={m.sx}
            />
        ),
    };

    c = useComponent(def, params);
    m = c.model;
    return c;
};

export type PaginationStruct = Struct;

export const Pagination = toReact(usePagination);
Pagination.displayName = 'Pagination';
