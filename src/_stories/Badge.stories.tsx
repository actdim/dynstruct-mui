import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button as MuiButton } from '@mui/material';
import { Badge } from '../Badge';
import { AppContextProvider, appMsgBus } from './bootstrap';
import { StorageService } from '@actdim/dynstruct/services/react/StorageService';

const MailIcon: React.FC = () => <MuiButton variant="outlined">Inbox</MuiButton>;

const meta: Meta<typeof Badge> = {
    title: 'Display/Badge',
    component: Badge,
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
            options: ['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning'],
        },
        variant: { control: 'select', options: ['standard', 'dot'] },
        max: { control: 'number' },
        invisible: { control: 'boolean' },
        children: { control: false },
        badgeContent: { control: false },
        anchorOrigin: { control: false },
        sx: { control: false },
    },
    args: {
        children: MailIcon,
        badgeContent: 4,
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Primary: Story = {
    args: { color: 'primary', badgeContent: 7 },
};

export const Error: Story = {
    args: { color: 'error', badgeContent: 12 },
};

export const Dot: Story = {
    args: { variant: 'dot', color: 'error' },
};

export const OverMax: Story = {
    args: { badgeContent: 1000, max: 99 },
};

export const Invisible: Story = {
    args: { invisible: true },
};
