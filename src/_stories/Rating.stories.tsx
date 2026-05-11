import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Rating } from '../Rating';
import { AppContextProvider, appMsgBus } from './bootstrap';
import { StorageService } from '@actdim/dynstruct/services/react/StorageService';

const meta: Meta<typeof Rating> = {
    title: 'Controls/Rating',
    component: Rating,
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
        size: { control: 'select', options: ['small', 'medium', 'large'] },
        max: { control: 'number' },
        precision: { control: 'select', options: [1, 0.5, 0.25] },
        readOnly: { control: 'boolean' },
        value: { control: { type: 'number', min: 0, max: 5 } },
        sx: { control: false },
    },
    args: {
        value: 3,
        onChange: fn(),
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const HalfPrecision: Story = {
    args: { value: 3.5, precision: 0.5 },
};

export const ReadOnly: Story = {
    args: { value: 4, readOnly: true },
};

export const Small: Story = {
    args: { size: 'small' },
};

export const Large: Story = {
    args: { size: 'large' },
};

export const TenStars: Story = {
    args: { max: 10, value: 7 },
};
