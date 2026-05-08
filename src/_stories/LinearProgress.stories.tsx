import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box } from '@mui/material';
import { LinearProgress } from '../LinearProgress';
import { AppContextProvider, appMsgBus } from './bootstrap';
import { StorageService } from '@actdim/dynstruct/services/react/StorageService';

const meta: Meta<typeof LinearProgress> = {
    title: 'Controls/LinearProgress',
    component: LinearProgress,
    decorators: [
        (Story) => (
            <AppContextProvider value={{ msgBus: appMsgBus }}>
                <StorageService storeName={'test'} />
                <Box sx={{ width: 300 }}>
                    <Story />
                </Box>
            </AppContextProvider>
        ),
    ],
    parameters: { layout: 'centered' },
    tags: ['autodocs'],
    argTypes: {
        variant: { control: 'select', options: ['indeterminate', 'determinate', 'buffer', 'query'] },
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'error', 'info', 'success', 'warning', 'inherit'],
        },
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

export const Buffer: Story = {
    args: { variant: 'buffer', value: 50, valueBuffer: 75 },
};

export const Secondary: Story = {
    args: { color: 'secondary' },
};

export const Success: Story = {
    args: { variant: 'determinate', value: 100, color: 'success' },
};
