import React from 'react';
import {
    Breadcrumbs as MuiBreadcrumbs,
    Link,
    Typography,
    type BreadcrumbsProps as MuiBreadcrumbsProps,
} from '@mui/material';
import {
    type ComponentStruct,
    type ComponentDef,
    type ComponentParams,
    type Component,
    type ComponentModel,
} from '@actdim/dynstruct/componentModel/contracts';
import { useComponent, toReact } from '@actdim/dynstruct/componentModel/react/react';
import { type BaseAppMsgStruct } from '@actdim/dynstruct/appDomain/appContracts';

export type BreadcrumbItem = {
    label: string;
    href?: string;
    onClick?: () => void;
};

type Struct<TMsgStruct extends BaseAppMsgStruct = BaseAppMsgStruct> = ComponentStruct<
    TMsgStruct,
    {
        props: {
            items: BreadcrumbItem[];
            separator?: React.ReactNode;
            maxItems?: number;
            sx?: MuiBreadcrumbsProps['sx'];
        };
    }
>;

export const useBreadcrumbs = (params: ComponentParams<Struct>): Component<Struct> => {
    let c: Component<Struct>;
    let m: ComponentModel<Struct>;

    const def: ComponentDef<Struct> = {
        regType: 'Breadcrumbs',
        props: {
            items: [],
            separator: undefined,
            maxItems: 8,
            sx: undefined,
        },
        view: () => (
            <MuiBreadcrumbs
                separator={m.separator}
                maxItems={m.maxItems}
                aria-label="breadcrumb"
                sx={m.sx}
            >
                {m.items.map((item, i) =>
                    i === m.items.length - 1 ? (
                        <Typography key={i} sx={{ color: 'text.primary' }}>
                            {item.label}
                        </Typography>
                    ) : (
                        <Link
                            key={i}
                            underline="hover"
                            color="inherit"
                            href={item.href}
                            onClick={item.onClick}
                            sx={{ cursor: item.onClick && !item.href ? 'pointer' : undefined }}
                        >
                            {item.label}
                        </Link>
                    ),
                )}
            </MuiBreadcrumbs>
        ),
    };

    c = useComponent(def, params);
    m = c.model;
    return c;
};

export type BreadcrumbsStruct = Struct;

export const Breadcrumbs = toReact(useBreadcrumbs);
Breadcrumbs.displayName = 'Breadcrumbs';
