import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button as MuiButton } from '@mui/material';
import { Tooltip } from '../Tooltip';
import { AppContextProvider, appMsgBus } from './bootstrap';
import { StorageService } from '@actdim/dynstruct/services/react/StorageService';

const HoverTarget: React.FC = () => <MuiButton variant="contained">Hover me</MuiButton>;

const meta: Meta<typeof Tooltip> = {
    title: 'Display/Tooltip',
    component: Tooltip,
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
        placement: {
            control: 'select',
            options: ['bottom', 'top', 'left', 'right', 'bottom-start', 'bottom-end', 'top-start', 'top-end'],
        },
        arrow: { control: 'boolean' },
        children: { control: false },
    },
    args: {
        title: 'Tooltip text',
        children: HoverTarget,
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithArrow: Story = {
    args: { arrow: true },
};

export const Top: Story = {
    args: { placement: 'top' },
};

export const Left: Story = {
    args: { placement: 'left' },
};

export const Right: Story = {
    args: { placement: 'right' },
};

export const LongText: Story = {
    args: { title: 'This is a longer tooltip description with more detail.' },
};
