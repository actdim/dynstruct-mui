import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Box } from '@mui/material';
import { SpeedDial } from '../SpeedDial';
import { AppContextProvider, appMsgBus } from './bootstrap';
import { StorageService } from '@actdim/dynstruct/services/react/StorageService';

const CopyIcon: React.FC = () => <span style={{ fontSize: 16 }}>⎘</span>;
const SaveIcon: React.FC = () => <span style={{ fontSize: 16 }}>💾</span>;
const PrintIcon: React.FC = () => <span style={{ fontSize: 16 }}>🖨</span>;
const ShareIcon: React.FC = () => <span style={{ fontSize: 16 }}>↗</span>;

const ACTIONS = [
    { name: 'Copy', icon: CopyIcon, onClick: fn() },
    { name: 'Save', icon: SaveIcon, onClick: fn() },
    { name: 'Print', icon: PrintIcon, onClick: fn() },
    { name: 'Share', icon: ShareIcon, onClick: fn() },
];

const meta: Meta<typeof SpeedDial> = {
    title: 'Controls/SpeedDial',
    component: SpeedDial,
    decorators: [
        (Story) => (
            <AppContextProvider value={{ msgBus: appMsgBus }}>
                <StorageService storeName={'test'} />
                <Box sx={{ height: 200, position: 'relative' }}>
                    <Story />
                </Box>
            </AppContextProvider>
        ),
    ],
    parameters: { layout: 'padded' },
    tags: ['autodocs'],
    argTypes: {
        direction: { control: 'select', options: ['up', 'down', 'left', 'right'] },
        hidden: { control: 'boolean' },
        actions: { control: false },
        icon: { control: false },
        sx: { control: false },
    },
    args: {
        ariaLabel: 'SpeedDial',
        actions: ACTIONS,
        sx: { position: 'absolute', bottom: 16, right: 16 },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DirectionDown: Story = {
    args: { direction: 'down', sx: { position: 'absolute', top: 16, right: 16 } },
};

export const DirectionLeft: Story = {
    args: { direction: 'left', sx: { position: 'absolute', bottom: 16, right: 16 } },
};

export const DirectionRight: Story = {
    args: { direction: 'right', sx: { position: 'absolute', bottom: 16, left: 16 } },
};
