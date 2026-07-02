import React from 'react';
import {
    TableContainer,
    Table as MuiTable,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    type TableProps as MuiTableProps,
    type TableContainerProps as MuiTableContainerProps,
    type TableCellProps as MuiTableCellProps,
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

export type TableColumn = {
    id: string;
    label: string;
    align?: MuiTableCellProps['align'];
    minWidth?: number;
};

type Struct<TMsgStruct extends BaseAppMsgStruct = BaseAppMsgStruct> = ComponentStruct<
    TMsgStruct,
    {
        props: {
            columns: TableColumn[];
            rows: Record<string, React.ReactNode>[];
            stickyHeader?: boolean;
            size?: MuiTableProps['size'];
            sx?: MuiTableContainerProps['sx'];
        };
    }
>;

export const useTable = (params: ComponentParams<Struct>): Component<Struct> => {
    let c: Component<Struct>;
    let m: ComponentModel<Struct>;

    const def: ComponentDef<Struct> = {
        regType: 'Table',
        props: {
            columns: [],
            rows: [],
            stickyHeader: false,
            size: 'medium',
            sx: undefined,
        },
        view: () => (
            <TableContainer component={Paper} sx={m.sx}>
                <MuiTable stickyHeader={m.stickyHeader} size={m.size}>
                    <TableHead>
                        <TableRow>
                            {m.columns.map((col) => (
                                <TableCell
                                    key={col.id}
                                    align={col.align}
                                    style={col.minWidth ? { minWidth: col.minWidth } : undefined}
                                >
                                    {col.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {m.rows.map((row, i) => (
                            <TableRow key={i} hover>
                                {m.columns.map((col) => (
                                    <TableCell key={col.id} align={col.align}>
                                        {row[col.id]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </MuiTable>
            </TableContainer>
        ),
    };

    c = useComponent(def, params);
    m = c.model;
    return c;
};

export type TableStruct = Struct;

export const Table = toReact(useTable);
Table.displayName = 'Table';
