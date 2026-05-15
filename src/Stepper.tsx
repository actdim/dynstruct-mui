import React from 'react';
import {
    Stepper as MuiStepper,
    Step,
    StepLabel,
    Typography,
    type StepperProps as MuiStepperProps,
} from '@mui/material';
import {
    type ComponentStruct,
    type ComponentDef,
    type ComponentParams,
    type Component,
    type ComponentModel,
} from '@actdim/dynstruct/componentModel/contracts';
import { useComponent, toReact } from '@actdim/dynstruct/componentModel/react/react';
import { type BaseAppMsgStruct } from '@actdim/dynstruct/appDomain/appContracts';

export type StepDef = {
    label: string;
    optional?: string;
};

type Struct<TMsgStruct extends BaseAppMsgStruct = BaseAppMsgStruct> = ComponentStruct<
    TMsgStruct,
    {
        props: {
            activeStep: number;
            steps: StepDef[];
            orientation?: MuiStepperProps['orientation'];
            alternativeLabel?: boolean;
            nonLinear?: boolean;
            sx?: MuiStepperProps['sx'];
        };
    }
>;

export const useStepper = (params: ComponentParams<Struct>): Component<Struct> => {
    let c: Component<Struct>;
    let m: ComponentModel<Struct>;

    const def: ComponentDef<Struct> = {
        regType: 'Stepper',
        props: {
            activeStep: 0,
            steps: [],
            orientation: 'horizontal',
            alternativeLabel: false,
            nonLinear: false,
            sx: undefined,
        },
        view: () => (
            <MuiStepper
                activeStep={m.activeStep}
                orientation={m.orientation}
                alternativeLabel={m.alternativeLabel}
                nonLinear={m.nonLinear}
                sx={m.sx}
            >
                {m.steps.map((step, i) => (
                    <Step key={i}>
                        <StepLabel
                            optional={
                                step.optional ? (
                                    <Typography variant="caption">{step.optional}</Typography>
                                ) : undefined
                            }
                        >
                            {step.label}
                        </StepLabel>
                    </Step>
                ))}
            </MuiStepper>
        ),
    };

    c = useComponent(def, params);
    m = c.model;
    return c;
};

export type StepperStruct = Struct;

export const Stepper = toReact(useStepper);
Stepper.displayName = 'Stepper';
