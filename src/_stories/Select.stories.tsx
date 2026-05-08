import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Select } from '../Select';
import { AppContextProvider, appMsgBus } from './bootstrap';
import { StorageService } from '@actdim/dynstruct/services/react/StorageService';

const OPTIONS = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
    { value: 'date', label: 'Date' },
];

const meta: Meta<typeof Select> = {
    title: 'Controls/Select',
    component: Select,
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
        error: { control: 'boolean' },
        fullWidth: { control: 'boolean' },
        options: { control: false },
        sx: { control: false },
    },
    args: {
        value: '',
        options: OPTIONS,
        label: 'Fruit',
        onChange: fn(),
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
    args: { value: 'banana' },
};

export const WithHelperText: Story = {
    args: { helperText: 'Choose one option' },
};

export const WithError: Story = {
    args: { error: true, helperText: 'Required', value: '' },
};

export const Filled: Story = {
    args: { variant: 'filled', value: 'cherry' },
};

export const Small: Story = {
    args: { size: 'small', value: 'apple' },
};

export const FullWidth: Story = {
    args: { fullWidth: true },
    parameters: { layout: 'padded' },
};
