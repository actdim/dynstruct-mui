import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Box, List, ListItem, ListItemButton, ListItemText, Divider, Button as MuiButton } from '@mui/material';
import { Drawer } from '../Drawer';
import { AppContextProvider, appMsgBus } from './bootstrap';
import { StorageService } from '@actdim/dynstruct/services/react/StorageService';

const DrawerContent: React.FC = () => (
    <Box sx={{ width: 250 }} role="presentation">
        <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text) => (
                <ListItem key={text} disablePadding>
                    <ListItemButton>
                        <ListItemText primary={text} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
        <Divider />
        <List>
            {['All mail', 'Trash', 'Spam'].map((text) => (
                <ListItem key={text} disablePadding>
                    <ListItemButton>
                        <ListItemText primary={text} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    </Box>
);

const meta: Meta<typeof Drawer> = {
    title: 'Navigation/Drawer',
    component: Drawer,
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
        anchor: { control: 'select', options: ['left', 'right', 'top', 'bottom'] },
        variant: { control: 'select', options: ['temporary', 'persistent', 'permanent'] },
        children: { control: false },
        sx: { control: false },
    },
    args: {
        open: true,
        onClose: fn(),
        children: DrawerContent,
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Left: Story = {
    args: { anchor: 'left' },
};

export const Right: Story = {
    args: { anchor: 'right' },
};

export const Top: Story = {
    args: { anchor: 'top' },
};

export const Bottom: Story = {
    args: { anchor: 'bottom' },
};

export const Interactive: Story = {
    render: (args) => {
        const [open, setOpen] = React.useState(false);
        return (
            <>
                <MuiButton variant="contained" onClick={() => setOpen(true)}>
                    Open Drawer
                </MuiButton>
                <Drawer {...args} open={open} onClose={() => setOpen(false)} />
            </>
        );
    },
    args: { anchor: 'left', children: DrawerContent },
};
