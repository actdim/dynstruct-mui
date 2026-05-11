import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { List } from '../List';
import { AppContextProvider, appMsgBus } from './bootstrap';
import { StorageService } from '@actdim/dynstruct/services/react/StorageService';

const ITEMS = [
    { primary: 'Inbox', secondary: '5 new messages', onClick: fn() },
    { primary: 'Drafts', secondary: '2 drafts', onClick: fn() },
    { divider: true, primary: '' },
    { primary: 'Sent Mail', onClick: fn() },
    { primary: 'Spam', onClick: fn(), disabled: true },
];

const meta: Meta<typeof List> = {
    title: 'Display/List',
    component: List,
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
        dense: { control: 'boolean' },
        disablePadding: { control: 'boolean' },
        items: { control: false },
        sx: { control: false },
    },
    args: {
        items: ITEMS,
        sx: { width: 280, bgcolor: 'background.paper' },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Dense: Story = {
    args: { dense: true },
};

export const StaticItems: Story = {
    args: {
        items: [
            { primary: 'Photos' },
            { primary: 'Work' },
            { primary: 'Vacation' },
        ],
    },
};

export const WithSecondaryText: Story = {
    args: {
        items: [
            { primary: 'Brunch this weekend?', secondary: 'Ali Connors — I\'ll be in your neighborhood...' },
            { divider: true, primary: '' },
            { primary: 'Summer BBQ', secondary: 'to Scott, Alex, Jennifer — Wish I could come...' },
        ],
    },
};
