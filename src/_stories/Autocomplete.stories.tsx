import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Autocomplete } from '../Autocomplete';
import { AppContextProvider, appMsgBus } from './bootstrap';
import { StorageService } from '@actdim/dynstruct/services/react/StorageService';

const FRUITS = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape'];

const meta: Meta<typeof Autocomplete> = {
    title: 'Controls/Autocomplete',
    component: Autocomplete,
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
        variant: { control: 'select', options: ['outlined', 'filled', 'standard'] },
        size: { control: 'select', options: ['small', 'medium'] },
        error: { control: 'boolean' },
        loading: { control: 'boolean' },
        freeSolo: { control: 'boolean' },
        fullWidth: { control: 'boolean' },
        options: { control: false },
        sx: { control: false },
    },
    args: {
        value: null,
        options: FRUITS,
        label: 'Fruit',
        onChange: fn(),
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
    args: { value: 'Banana' },
};

export const WithPlaceholder: Story = {
    args: { placeholder: 'Type to search...' },
};

export const WithError: Story = {
    args: { error: true, helperText: 'Required field' },
};

export const FreeSolo: Story = {
    args: { freeSolo: true, label: 'Fruit or custom', placeholder: 'Type anything...' },
};

export const Loading: Story = {
    args: { loading: true, options: [] },
};

export const FullWidth: Story = {
    args: { fullWidth: true },
    parameters: { layout: 'padded' },
};
