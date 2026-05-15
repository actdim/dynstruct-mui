import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Table } from '../Table';
import { AppContextProvider, appMsgBus } from './bootstrap';
import { StorageService } from '@actdim/dynstruct/services/react/StorageService';

const COLUMNS = [
    { id: 'name', label: 'Name', minWidth: 120 },
    { id: 'calories', label: 'Calories', align: 'right' as const },
    { id: 'fat', label: 'Fat (g)', align: 'right' as const },
    { id: 'carbs', label: 'Carbs (g)', align: 'right' as const },
    { id: 'protein', label: 'Protein (g)', align: 'right' as const },
];

const ROWS = [
    { name: 'Frozen yoghurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0 },
    { name: 'Ice cream sandwich', calories: 237, fat: 9.0, carbs: 37, protein: 4.3 },
    { name: 'Eclair', calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
    { name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
    { name: 'Gingerbread', calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
];

const meta: Meta<typeof Table> = {
    title: 'Display/Table',
    component: Table,
    decorators: [
        (Story) => (
            <AppContextProvider value={{ msgBus: appMsgBus }}>
                <StorageService storeName={'test'} />
                <Story />
            </AppContextProvider>
        ),
    ],
    parameters: { layout: 'padded' },
    tags: ['autodocs'],
    argTypes: {
        size: { control: 'select', options: ['small', 'medium'] },
        stickyHeader: { control: 'boolean' },
        columns: { control: false },
        rows: { control: false },
        sx: { control: false },
    },
    args: {
        columns: COLUMNS,
        rows: ROWS,
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Dense: Story = {
    args: { size: 'small' },
};

export const StickyHeader: Story = {
    args: {
        stickyHeader: true,
        sx: { maxHeight: 200 },
    },
};
