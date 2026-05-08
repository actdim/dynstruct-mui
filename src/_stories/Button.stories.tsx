import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Button } from '../Button';
import { AppContextProvider, appMsgBus } from './bootstrap';
import { StorageService } from '@actdim/dynstruct/services/react/StorageService';

const meta: Meta<typeof Button> = {
    title: 'Controls/Button',
    component: Button,
    decorators: [
        (Story) => (
            <AppContextProvider value={{ msgBus: appMsgBus }}>
                <StorageService storeName={'test'}></StorageService>
                <Story></Story>
            </AppContextProvider>
        ),
    ],
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: { control: 'select', options: ['contained', 'outlined', 'text'] },
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'success', 'error', 'info', 'warning', 'inherit'],
        },
        size: { control: 'select', options: ['small', 'medium', 'large'] },
        loading: { control: 'boolean' },
        fullWidth: { control: 'boolean' },
        startIcon: { control: false },
        endIcon: { control: false },
        sx: { control: false },
    },
    args: {
        label: 'Button',
        onClick: fn(),
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Contained: Story = {
    args: {
        variant: 'contained',
        label: 'Button',
    }
};

export const Outlined: Story = {
    args: { variant: 'outlined' },
};

export const Text: Story = {
    args: { variant: 'text' },
};

export const Secondary: Story = {
    args: { variant: 'contained', color: 'secondary' },
};

export const Small: Story = {
    args: {
        size: 'small',
        label: 'Button',
    },
};

export const Large: Story = {
    args: { size: 'large' },
};

export const Loading: Story = {
    args: { loading: true },
};

export const FullWidth: Story = {
    args: { fullWidth: true },
    parameters: { layout: 'padded' },
};
