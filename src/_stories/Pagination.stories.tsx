import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Pagination } from '../Pagination';
import { AppContextProvider, appMsgBus } from './bootstrap';
import { StorageService } from '@actdim/dynstruct/services/react/StorageService';

const meta: Meta<typeof Pagination> = {
    title: 'Navigation/Pagination',
    component: Pagination,
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
        color: { control: 'select', options: ['standard', 'primary', 'secondary'] },
        size: { control: 'select', options: ['small', 'medium', 'large'] },
        shape: { control: 'select', options: ['circular', 'rounded'] },
        variant: { control: 'select', options: ['text', 'outlined'] },
        count: { control: 'number' },
        page: { control: 'number' },
        sx: { control: false },
    },
    args: {
        count: 10,
        page: 1,
        onChange: fn(),
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Primary: Story = {
    args: { color: 'primary' },
};

export const Outlined: Story = {
    args: { variant: 'outlined' },
};

export const OutlinedRounded: Story = {
    args: { variant: 'outlined', shape: 'rounded' },
};

export const Small: Story = {
    args: { size: 'small' },
};

export const Large: Story = {
    args: { size: 'large', count: 20, page: 5 },
};
