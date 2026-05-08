import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Switch } from '../Switch';
import { AppContextProvider, appMsgBus } from './bootstrap';
import { StorageService } from '@actdim/dynstruct/services/react/StorageService';

const meta: Meta<typeof Switch> = {
    title: 'Controls/Switch',
    component: Switch,
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
        size: { control: 'select', options: ['small', 'medium'] },
        checked: { control: 'boolean' },
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

export const On: Story = {
    args: { checked: true },
};

export const WithLabel: Story = {
    args: { label: 'Dark mode' },
};

export const OnWithLabel: Story = {
    args: { checked: true, label: 'Notifications' },
};

export const WithError: Story = {
    args: { label: 'Required', error: true, helperText: 'This setting is required' },
};

export const Small: Story = {
    args: { size: 'small', label: 'Compact' },
};
