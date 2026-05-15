import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Breadcrumbs } from '../Breadcrumbs';
import { AppContextProvider, appMsgBus } from './bootstrap';
import { StorageService } from '@actdim/dynstruct/services/react/StorageService';

const ITEMS = [
    { label: 'Home', href: '/' },
    { label: 'Components', href: '/components' },
    { label: 'Breadcrumbs' },
];

const meta: Meta<typeof Breadcrumbs> = {
    title: 'Navigation/Breadcrumbs',
    component: Breadcrumbs,
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
        maxItems: { control: 'number' },
        separator: { control: false },
        items: { control: false },
        sx: { control: false },
    },
    args: {
        items: ITEMS,
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithClickHandlers: Story = {
    args: {
        items: [
            { label: 'Home', onClick: fn() },
            { label: 'Components', onClick: fn() },
            { label: 'Breadcrumbs' },
        ],
    },
};

export const CustomSeparator: Story = {
    args: { separator: '›' },
};

export const Collapsed: Story = {
    args: {
        maxItems: 2,
        items: [
            { label: 'Home', href: '/' },
            { label: 'Catalog', href: '/catalog' },
            { label: 'Accessories', href: '/accessories' },
            { label: 'New Collection', href: '/new' },
            { label: 'Belts' },
        ],
    },
};
