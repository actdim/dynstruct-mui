import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Checkbox } from '../Checkbox';
import { AppContextProvider, appMsgBus } from './bootstrap';
import { StorageService } from '@actdim/dynstruct/services/react/StorageService';

const meta: Meta<typeof Checkbox> = {
    title: 'Controls/Checkbox',
    component: Checkbox,
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
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'error', 'info', 'success', 'warning', 'default'],
        },
        size: { control: 'select', options: ['small', 'medium', 'large'] },
        checked: { control: 'boolean' },
        indeterminate: { control: 'boolean' },
        error: { control: 'boolean' },
        sx: { control: false },
    },
    args: {
        checked: false,
        onChange: fn(),
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
    args: { checked: true },
};

export const WithLabel: Story = {
    args: { label: 'Accept terms' },
};

export const CheckedWithLabel: Story = {
    args: { checked: true, label: 'Notifications enabled' },
};

export const WithError: Story = {
    args: { label: 'Required field', error: true, helperText: 'You must accept the terms' },
};

export const Indeterminate: Story = {
    args: { indeterminate: true, label: 'Select all' },
};

export const Small: Story = {
    args: { size: 'small', label: 'Small checkbox' },
};
