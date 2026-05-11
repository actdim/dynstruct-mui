import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from '../Avatar';
import { AppContextProvider, appMsgBus } from './bootstrap';
import { StorageService } from '@actdim/dynstruct/services/react/StorageService';

const meta: Meta<typeof Avatar> = {
    title: 'Display/Avatar',
    component: Avatar,
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
        variant: { control: 'select', options: ['circular', 'rounded', 'square'] },
        children: { control: false },
        sx: { control: false },
    },
    args: {
        alt: 'User Avatar',
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithInitials: Story = {
    args: { children: 'JD' },
};

export const WithImage: Story = {
    args: { src: 'https://mui.com/static/images/avatar/1.jpg', alt: 'User' },
};

export const Rounded: Story = {
    args: { children: 'AB', variant: 'rounded' },
};

export const Square: Story = {
    args: { children: 'XY', variant: 'square' },
};

export const Colored: Story = {
    args: { children: 'PB', sx: { bgcolor: 'primary.main' } },
};
