import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Typography } from '@mui/material';
import { Accordion } from '../Accordion';
import { AppContextProvider, appMsgBus } from './bootstrap';
import { StorageService } from '@actdim/dynstruct/services/react/StorageService';

const PanelContent: React.FC = () => (
    <Typography>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
        sit amet blandit leo lobortis eget.
    </Typography>
);

const meta: Meta<typeof Accordion> = {
    title: 'Layout/Accordion',
    component: Accordion,
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
        summary: { control: 'text' },
        expanded: { control: 'boolean' },
        content: { control: false },
        expandIcon: { control: false },
        sx: { control: false },
    },
    args: {
        summary: 'Accordion Title',
        content: PanelContent,
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Expanded: Story = {
    args: { expanded: true },
};

export const Controlled: Story = {
    args: {
        expanded: false,
        onChange: fn(),
    },
};

export const WithExpandIcon: Story = {
    args: {
        expanded: true,
        expandIcon: '▼',
    },
};
