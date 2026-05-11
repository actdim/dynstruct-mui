import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button as MuiButton, Typography } from '@mui/material';
import { Card } from '../Card';
import { AppContextProvider, appMsgBus } from './bootstrap';
import { StorageService } from '@actdim/dynstruct/services/react/StorageService';

const BasicContent: React.FC = () => (
    <Typography variant="body2" color="text.secondary">
        This is some card content. Cards are surfaces that display content and actions on a single topic.
    </Typography>
);

const CardFooter: React.FC = () => (
    <>
        <MuiButton size="small">Learn More</MuiButton>
        <MuiButton size="small">Share</MuiButton>
    </>
);

const meta: Meta<typeof Card> = {
    title: 'Layout/Card',
    component: Card,
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
        raised: { control: 'boolean' },
        content: { control: false },
        headerAction: { control: false },
        actions: { control: false },
        avatar: { control: false },
        sx: { control: false },
    },
    args: {
        content: BasicContent,
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithTitle: Story = {
    args: { title: 'Card Title', subheader: 'Subheader text' },
};

export const WithActions: Story = {
    args: {
        title: 'Card Title',
        content: BasicContent,
        actions: CardFooter,
    },
};

export const Raised: Story = {
    args: { title: 'Raised Card', raised: true },
};

export const Narrow: Story = {
    args: {
        title: 'Compact Card',
        subheader: 'September 14, 2025',
        content: BasicContent,
        actions: CardFooter,
        sx: { maxWidth: 300 },
    },
};
