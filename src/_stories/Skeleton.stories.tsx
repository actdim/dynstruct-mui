import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box } from '@mui/material';
import { Skeleton } from '../Skeleton';
import { AppContextProvider, appMsgBus } from './bootstrap';
import { StorageService } from '@actdim/dynstruct/services/react/StorageService';

const meta: Meta<typeof Skeleton> = {
    title: 'Feedback/Skeleton',
    component: Skeleton,
    decorators: [
        (Story) => (
            <AppContextProvider value={{ msgBus: appMsgBus }}>
                <StorageService storeName={'test'} />
                <Story />
            </AppContextProvider>
        ),
    ],
    parameters: { layout: 'centered' },
    tags: ['autodocs'],
    argTypes: {
        variant: { control: 'select', options: ['text', 'circular', 'rectangular', 'rounded'] },
        animation: { control: 'select', options: ['pulse', 'wave', false] },
        width: { control: 'number' },
        height: { control: 'number' },
        sx: { control: false },
    },
    args: {
        width: 200,
        height: 20,
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
    args: { variant: 'text', width: 200 },
};

export const Circular: Story = {
    args: { variant: 'circular', width: 48, height: 48 },
};

export const Rectangular: Story = {
    args: { variant: 'rectangular', width: 200, height: 120 },
};

export const Rounded: Story = {
    args: { variant: 'rounded', width: 200, height: 120 },
};

export const Wave: Story = {
    args: { animation: 'wave', width: 200 },
};

export const CardPlaceholder: Story = {
    render: (args) => (
        <Box sx={{ width: 280 }}>
            <Skeleton {...args} variant="rectangular" height={140} />
            <Box sx={{ pt: 1 }}>
                <Skeleton {...args} variant="text" />
                <Skeleton {...args} variant="text" width="80%" />
                <Skeleton {...args} variant="text" width="60%" />
            </Box>
        </Box>
    ),
    args: { animation: 'pulse' },
};
