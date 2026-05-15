import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stepper } from '../Stepper';
import { AppContextProvider, appMsgBus } from './bootstrap';
import { StorageService } from '@actdim/dynstruct/services/react/StorageService';

const STEPS = [
    { label: 'Select campaign settings' },
    { label: 'Create an ad group' },
    { label: 'Create an ad' },
];

const STEPS_WITH_OPTIONAL = [
    { label: 'Select campaign settings' },
    { label: 'Create an ad group', optional: 'Optional' },
    { label: 'Create an ad' },
];

const meta: Meta<typeof Stepper> = {
    title: 'Navigation/Stepper',
    component: Stepper,
    decorators: [
        (Story) => (
            <AppContextProvider value={{ msgBus: appMsgBus }}>
                <StorageService storeName={'test'} />
                <Story />
            </AppContextProvider>
        ),
    ],
    parameters: { layout: 'padded' },
    tags: ['autodocs'],
    argTypes: {
        activeStep: { control: { type: 'number', min: 0, max: 3 } },
        orientation: { control: 'select', options: ['horizontal', 'vertical'] },
        alternativeLabel: { control: 'boolean' },
        nonLinear: { control: 'boolean' },
        steps: { control: false },
        sx: { control: false },
    },
    args: {
        activeStep: 1,
        steps: STEPS,
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FirstStep: Story = {
    args: { activeStep: 0 },
};

export const Completed: Story = {
    args: { activeStep: 3 },
};

export const AlternativeLabel: Story = {
    args: { alternativeLabel: true },
};

export const Vertical: Story = {
    args: { orientation: 'vertical' },
};

export const WithOptionalStep: Story = {
    args: { steps: STEPS_WITH_OPTIONAL },
};
