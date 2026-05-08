import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button as MuiButton } from '@mui/material';
import { Snackbar } from '../Snackbar';
import { AppContextProvider, appMsgBus } from './bootstrap';
import { StorageService } from '@actdim/dynstruct/services/react/StorageService';

const meta: Meta<typeof Snackbar> = {
    title: 'Controls/Snackbar',
    component: Snackbar,
    decorators: [
        (Story) => (
            <AppContextProvider value={{ msgBus: appMsgBus }}>
                <StorageService storeName={'test'} />
                <Story />
            </AppContextProvider>
        ),
    ],
    parameters: { layout: 'fullscreen' },
    tags: ['autodocs'],
    argTypes: {
        autoHideDuration: { control: 'number' },
        anchorOrigin: { control: false },
        action: { control: false },
        sx: { control: false },
    },
    args: {
        open: true,
        message: 'Operation completed successfully.',
        onClose: () => {},
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TopCenter: Story = {
    args: { anchorOrigin: { vertical: 'top', horizontal: 'center' } },
};

export const TopRight: Story = {
    args: { anchorOrigin: { vertical: 'top', horizontal: 'right' } },
};

export const WithAction: Story = {
    args: {
        message: 'File deleted.',
        action: (
            <MuiButton color="secondary" size="small">
                UNDO
            </MuiButton>
        ),
    },
};
