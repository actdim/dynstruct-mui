import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Button as MuiButton } from '@mui/material';
import { Menu } from '../Menu';
import { AppContextProvider, appMsgBus } from './bootstrap';
import { StorageService } from '@actdim/dynstruct/services/react/StorageService';

const ITEMS = [
    { label: 'Profile', onClick: fn() },
    { label: 'Settings', onClick: fn() },
    { divider: true, label: '' },
    { label: 'Logout', onClick: fn() },
];

const meta: Meta<typeof Menu> = {
    title: 'Controls/Menu',
    component: Menu,
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
        open: { control: 'boolean' },
        items: { control: false },
        anchorEl: { control: false },
        sx: { control: false },
    },
    args: {
        open: true,
        onClose: fn(),
        items: ITEMS,
        anchorEl: null,
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDisabledItem: Story = {
    args: {
        items: [
            { label: 'Profile', onClick: fn() },
            { label: 'Settings', onClick: fn(), disabled: true },
            { divider: true, label: '' },
            { label: 'Logout', onClick: fn() },
        ],
    },
};

export const Interactive: Story = {
    render: (args) => {
        const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
        return (
            <>
                <MuiButton variant="contained" onClick={(e) => setAnchorEl(e.currentTarget)}>
                    Open Menu
                </MuiButton>
                <Menu
                    {...args}
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={() => setAnchorEl(null)}
                />
            </>
        );
    },
    args: { items: ITEMS },
};
