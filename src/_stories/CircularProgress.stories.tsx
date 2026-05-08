import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CircularProgress } from '../CircularProgress';
import { AppContextProvider, appMsgBus } from './bootstrap';
import { StorageService } from '@actdim/dynstruct/services/react/StorageService';

const meta: Meta<typeof CircularProgress> = {
    title: 'Controls/CircularProgress',
    component: CircularProgress,
    decorators: [
        (Story) => (
            <AppContextProvider value={{ msgBus: appMsgBus }}>
                <StorageService storeName={'test'} />
                <Story />
            </AppContextProvider>
        ),
    ],
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: { control: 'select', options: ['indeterminate', 'determinate'] },
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'error', 'info', 'success', 'warning', 'inherit'],
        },
        size: { control: 'number' },
        thickness: { control: 'number' },
        value: { control: { type: 'range', min: 0, max: 100 } },
        sx: { control: false },
    },
    args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Indeterminate: Story = {};

export const Determinate: Story = {
    args: { variant: 'determinate', value: 65 },
};

export const Small: Story = {
    args: { size: 24 },
};

export const Large: Story = {
    args: { size: 64 },
};

export const Secondary: Story = {
    args: { color: 'secondary' },
};
