import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { TextField } from '../TextField';
import { AppContextProvider, appMsgBus } from './bootstrap';
import { StorageService } from '@actdim/dynstruct/services/react/StorageService';

const meta: Meta<typeof TextField> = {
    title: 'Controls/TextField',
    component: TextField,
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
        variant: { control: 'select', options: ['outlined', 'filled', 'standard'] },
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'error', 'info', 'success', 'warning'],
        },
        size: { control: 'select', options: ['small', 'medium'] },
        type: { control: 'select', options: ['text', 'password', 'email', 'number', 'search'] },
        error: { control: 'boolean' },
        multiline: { control: 'boolean' },
        fullWidth: { control: 'boolean' },
        rows: { control: 'number' },
        sx: { control: false },
    },
    args: {
        label: 'Label',
        value: '',
        onChange: fn(),
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
    args: { value: 'Hello world' },
};

export const WithHelperText: Story = {
    args: { helperText: 'Supporting text' },
};

export const WithError: Story = {
    args: { error: true, helperText: 'This field is required', value: '' },
};

export const Password: Story = {
    args: { type: 'password', value: 'secret' },
};

export const Multiline: Story = {
    args: { multiline: true, rows: 4, value: 'Line 1\nLine 2' },
};

export const Filled: Story = {
    args: { variant: 'filled' },
};

export const Small: Story = {
    args: { size: 'small' },
};

export const FullWidth: Story = {
    args: { fullWidth: true },
    parameters: { layout: 'padded' },
};
