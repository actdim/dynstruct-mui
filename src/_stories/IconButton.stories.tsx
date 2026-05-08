import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { SvgIcon } from '@mui/material';
import { IconButton } from '../IconButton';
import { AppContextProvider, appMsgBus } from './bootstrap';
import { StorageService } from '@actdim/dynstruct/services/react/StorageService';

const DeleteIcon = () => (
    <SvgIcon>
        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
    </SvgIcon>
);

const EditIcon = () => (
    <SvgIcon>
        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
    </SvgIcon>
);

const FavoriteIcon = () => (
    <SvgIcon>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </SvgIcon>
);

const meta: Meta<typeof IconButton> = {
    title: 'Controls/IconButton',
    component: IconButton,
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
            options: ['default', 'inherit', 'primary', 'secondary', 'error', 'info', 'success', 'warning'],
        },
        size: { control: 'select', options: ['small', 'medium', 'large'] },
        loading: { control: 'boolean' },
        icon: { control: false },
        sx: { control: false },
    },
    args: {
        onClick: fn(),
        'aria-label': 'action',
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Delete: Story = {
    args: { icon: <DeleteIcon />, 'aria-label': 'delete', color: 'default' },
};

export const Edit: Story = {
    args: { icon: <EditIcon />, 'aria-label': 'edit', color: 'primary' },
};

export const Favorite: Story = {
    args: { icon: <FavoriteIcon />, 'aria-label': 'favorite', color: 'error' },
};

export const Small: Story = {
    args: { icon: <DeleteIcon />, size: 'small', 'aria-label': 'delete' },
};

export const Loading: Story = {
    args: { icon: <EditIcon />, loading: true, 'aria-label': 'edit' },
};
