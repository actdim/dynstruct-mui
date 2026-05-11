import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { ToggleButtonGroup } from '../ToggleButtonGroup';
import { AppContextProvider, appMsgBus } from './bootstrap';
import { StorageService } from '@actdim/dynstruct/services/react/StorageService';

const ALIGNMENT_ITEMS = [
    { value: 'left', label: 'Left' },
    { value: 'center', label: 'Center' },
    { value: 'right', label: 'Right' },
    { value: 'justify', label: 'Justify' },
];

const FORMAT_ITEMS = [
    { value: 'bold', label: 'Bold' },
    { value: 'italic', label: 'Italic' },
    { value: 'underline', label: 'Underline' },
];

const meta: Meta<typeof ToggleButtonGroup> = {
    title: 'Controls/ToggleButtonGroup',
    component: ToggleButtonGroup,
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
        size: { control: 'select', options: ['small', 'medium', 'large'] },
        color: {
            control: 'select',
            options: ['standard', 'primary', 'secondary', 'error', 'info', 'success', 'warning'],
        },
        orientation: { control: 'select', options: ['horizontal', 'vertical'] },
        exclusive: { control: 'boolean' },
        fullWidth: { control: 'boolean' },
        items: { control: false },
        sx: { control: false },
    },
    args: {
        value: 'left',
        exclusive: true,
        items: ALIGNMENT_ITEMS,
        onChange: fn(),
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Exclusive: Story = {};

export const MultiSelect: Story = {
    args: {
        value: ['bold'],
        exclusive: false,
        items: FORMAT_ITEMS,
    },
};

export const Primary: Story = {
    args: { color: 'primary' },
};

export const Small: Story = {
    args: { size: 'small' },
};

export const Vertical: Story = {
    args: { orientation: 'vertical' },
};

export const FullWidth: Story = {
    args: { fullWidth: true },
    parameters: { layout: 'padded' },
};
