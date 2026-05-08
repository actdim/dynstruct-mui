import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { RadioGroup } from '../RadioGroup';
import { AppContextProvider, appMsgBus } from './bootstrap';
import { StorageService } from '@actdim/dynstruct/services/react/StorageService';

const OPTIONS = [
    { value: 'a', label: 'Option A' },
    { value: 'b', label: 'Option B' },
    { value: 'c', label: 'Option C' },
];

const meta: Meta<typeof RadioGroup> = {
    title: 'Controls/RadioGroup',
    component: RadioGroup,
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
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'error', 'info', 'success', 'warning', 'default'],
        },
        size: { control: 'select', options: ['small', 'medium'] },
        row: { control: 'boolean' },
        error: { control: 'boolean' },
        options: { control: false },
        sx: { control: false },
    },
    args: {
        value: 'a',
        options: OPTIONS,
        onChange: fn(),
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
    args: { label: 'Choose an option' },
};

export const Row: Story = {
    args: { label: 'Layout', row: true },
};

export const WithError: Story = {
    args: { label: 'Required', error: true, helperText: 'Please select an option', value: '' },
};

export const Small: Story = {
    args: { size: 'small', label: 'Size' },
};
