import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Chip } from '../Chip';
import { AppContextProvider, appMsgBus } from './bootstrap';
import { StorageService } from '@actdim/dynstruct/services/react/StorageService';

const meta: Meta<typeof Chip> = {
    title: 'Display/Chip',
    component: Chip,
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
        variant: { control: 'select', options: ['filled', 'outlined'] },
        color: {
            control: 'select',
            options: ['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning'],
        },
        size: { control: 'select', options: ['small', 'medium'] },
        icon: { control: false },
        sx: { control: false },
    },
    args: {
        label: 'Chip',
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Clickable: Story = {
    args: { onClick: fn() },
};

export const Deletable: Story = {
    args: { onDelete: fn() },
};

export const ClickableAndDeletable: Story = {
    args: { onClick: fn(), onDelete: fn() },
};

export const Outlined: Story = {
    args: { variant: 'outlined' },
};

export const Small: Story = {
    args: { size: 'small' },
};

export const Colored: Story = {
    args: { color: 'primary' },
};
