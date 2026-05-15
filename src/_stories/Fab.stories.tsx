import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Fab } from '../Fab';
import { AppContextProvider, appMsgBus } from './bootstrap';
import { StorageService } from '@actdim/dynstruct/services/react/StorageService';

const AddIcon: React.FC = () => <span style={{ fontSize: 24, lineHeight: 1 }}>+</span>;
const EditIcon: React.FC = () => <span style={{ fontSize: 18, lineHeight: 1 }}>✎</span>;

const meta: Meta<typeof Fab> = {
    title: 'Controls/Fab',
    component: Fab,
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
        color: {
            control: 'select',
            options: ['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning'],
        },
        size: { control: 'select', options: ['small', 'medium', 'large'] },
        variant: { control: 'select', options: ['circular', 'extended'] },
        icon: { control: false },
        sx: { control: false },
    },
    args: {
        ariaLabel: 'add',
        icon: AddIcon,
        onClick: fn(),
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: { color: 'primary' },
};

export const Secondary: Story = {
    args: { color: 'secondary', icon: EditIcon, ariaLabel: 'edit' },
};

export const Extended: Story = {
    args: { variant: 'extended', label: 'Add item', color: 'primary' },
};

export const Small: Story = {
    args: { size: 'small', color: 'primary' },
};

export const Medium: Story = {
    args: { size: 'medium', color: 'primary' },
};
