import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Box } from '@mui/material';
import { Slider } from '../Slider';
import { AppContextProvider, appMsgBus } from './bootstrap';
import { StorageService } from '@actdim/dynstruct/services/react/StorageService';

const meta: Meta<typeof Slider> = {
    title: 'Controls/Slider',
    component: Slider,
    decorators: [
        (Story) => (
            <AppContextProvider value={{ msgBus: appMsgBus }}>
                <StorageService storeName={'test'} />
                <Box sx={{ width: 300, px: 2, pt: 2 }}>
                    <Story />
                </Box>
            </AppContextProvider>
        ),
    ],
    parameters: { layout: 'centered' },
    tags: ['autodocs'],
    argTypes: {
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'error', 'info', 'success', 'warning'],
        },
        size: { control: 'select', options: ['small', 'medium'] },
        valueLabelDisplay: { control: 'select', options: ['auto', 'on', 'off'] },
        track: { control: 'select', options: ['normal', 'inverted', false] },
        marks: { control: 'boolean' },
        value: { control: { type: 'range', min: 0, max: 100 } },
        sx: { control: false },
    },
    args: {
        value: 30,
        onChange: fn(),
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithMarks: Story = {
    args: { marks: true, step: 10 },
};

export const WithValueLabel: Story = {
    args: { valueLabelDisplay: 'on' },
};

export const Small: Story = {
    args: { size: 'small' },
};

export const Inverted: Story = {
    args: { track: 'inverted', value: 70 },
};

export const Secondary: Story = {
    args: { color: 'secondary' },
};
