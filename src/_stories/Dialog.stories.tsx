import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button as MuiButton } from '@mui/material';
import { Dialog } from '../Dialog';
import { AppContextProvider, appMsgBus } from './bootstrap';
import { StorageService } from '@actdim/dynstruct/services/react/StorageService';

const meta: Meta<typeof Dialog> = {
    title: 'Controls/Dialog',
    component: Dialog,
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
        maxWidth: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl', false] },
        fullWidth: { control: 'boolean' },
        fullScreen: { control: 'boolean' },
        open: { control: 'boolean' },
        content: { control: false },
        actions: { control: false },
        sx: { control: false },
    },
    args: {
        title: 'Dialog Title',
        open: true,
        onClose: () => {},
        content: () => <p style={{ margin: 0 }}>Dialog body content goes here.</p>,
        actions: () => (
            <MuiButton variant="contained" size="small">
                OK
            </MuiButton>
        ),
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutTitle: Story = {
    args: { title: undefined },
};

export const Large: Story = {
    args: { maxWidth: 'md', title: 'Large Dialog' },
};

export const FullScreen: Story = {
    args: { fullScreen: true },
};
