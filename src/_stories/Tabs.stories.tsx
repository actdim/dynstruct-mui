import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Box, Typography } from '@mui/material';
import { Tabs } from '../Tabs';
import { AppContextProvider, appMsgBus } from './bootstrap';
import { StorageService } from '@actdim/dynstruct/services/react/StorageService';

const ContentOne: React.FC = () => <Typography p={2}>Content for Tab One</Typography>;
const ContentTwo: React.FC = () => <Typography p={2}>Content for Tab Two</Typography>;
const ContentThree: React.FC = () => <Typography p={2}>Content for Tab Three</Typography>;

const TABS = [
    { value: 'one', label: 'Tab One', content: ContentOne },
    { value: 'two', label: 'Tab Two', content: ContentTwo },
    { value: 'three', label: 'Tab Three', content: ContentThree },
];

const meta: Meta<typeof Tabs> = {
    title: 'Navigation/Tabs',
    component: Tabs,
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
        orientation: { control: 'select', options: ['horizontal', 'vertical'] },
        variant: { control: 'select', options: ['standard', 'scrollable', 'fullWidth'] },
        tabs: { control: false },
        sx: { control: false },
    },
    args: {
        value: 'one',
        tabs: TABS,
        onChange: fn(),
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SecondTabActive: Story = {
    args: { value: 'two' },
};

export const FullWidth: Story = {
    args: { variant: 'fullWidth' },
    parameters: { layout: 'padded' },
};

export const Scrollable: Story = {
    args: { variant: 'scrollable' },
    parameters: { layout: 'padded' },
};

export const Vertical: Story = {
    args: { orientation: 'vertical' },
    decorators: [
        (Story) => (
            <Box sx={{ display: 'flex' }}>
                <Story />
            </Box>
        ),
    ],
};
