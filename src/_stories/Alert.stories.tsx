import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Alert } from '../Alert';
import { AppContextProvider, appMsgBus } from './bootstrap';
import { StorageService } from '@actdim/dynstruct/services/react/StorageService';

const meta: Meta<typeof Alert> = {
    title: 'Controls/Alert',
    component: Alert,
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
        severity: { control: 'select', options: ['success', 'info', 'warning', 'error'] },
        variant: { control: 'select', options: ['standard', 'filled', 'outlined'] },
        sx: { control: false },
    },
    args: {
        message: 'This is an alert message.',
        onClose: fn(),
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
    args: { severity: 'info' },
};

export const Success: Story = {
    args: { severity: 'success', message: 'Operation completed successfully.' },
};

export const Warning: Story = {
    args: { severity: 'warning', message: 'Please review before proceeding.' },
};

export const Error: Story = {
    args: { severity: 'error', message: 'Something went wrong. Please try again.' },
};

export const Filled: Story = {
    args: { severity: 'success', variant: 'filled', message: 'Saved!' },
};

export const Outlined: Story = {
    args: { severity: 'warning', variant: 'outlined' },
};

export const WithoutClose: Story = {
    args: { severity: 'info', onClose: undefined },
};
