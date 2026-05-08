import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ContactForm } from './ContactForm';
import { AppContextProvider, appMsgBus } from '../bootstrap';
import { StorageService } from '@actdim/dynstruct/services/react/StorageService';

const meta: Meta<typeof ContactForm> = {
    title: 'Examples/ContactForm',
    component: ContactForm,
    decorators: [
        (Story) => (
            <AppContextProvider value={{ msgBus: appMsgBus }}>
                <StorageService storeName={'test'} />
                <Story />
            </AppContextProvider>
        ),
    ],
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        name: { control: 'text' },
        email: { control: 'text' },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Prefilled: Story = {
    args: {
        name: 'John Smith',
        email: 'john@example.com',
    },
};
