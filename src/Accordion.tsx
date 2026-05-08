import React from 'react';
import {
    Accordion as MuiAccordion,
    AccordionSummary,
    AccordionDetails,
    type AccordionProps as MuiAccordionProps,
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

type Struct<TMsgStruct extends BaseAppMsgStruct = BaseAppMsgStruct> = ComponentStruct<
    TMsgStruct,
    {
        props: {
            summary: React.ReactNode;
            content: React.FC;
            expanded?: boolean;
            onChange?: (expanded: boolean) => void;
            expandIcon?: React.ReactNode;
            sx?: MuiAccordionProps['sx'];
        };
    }
>;

export const useAccordion = (params: ComponentParams<Struct>): Component<Struct> => {
    let c: Component<Struct>;
    let m: ComponentModel<Struct>;

    const def: ComponentDef<Struct> = {
        regType: 'Accordion',
        props: {
            summary: '',
            content: () => null,
            expanded: undefined,
            onChange: undefined,
            expandIcon: undefined,
            sx: undefined,
        },
        view: () => (
            <MuiAccordion
                expanded={m.expanded}
                onChange={m.onChange ? (_, v) => m.onChange!(v) : undefined}
                disabled={m.$.isDisabled}
                sx={m.sx}
            >
                <AccordionSummary expandIcon={m.expandIcon}>
                    {m.summary}
                </AccordionSummary>
                <AccordionDetails>
                    <m.content />
                </AccordionDetails>
            </MuiAccordion>
        ),
    };

    c = useComponent(def, params);
    m = c.model;
    return c;
};

export type AccordionStruct = Struct;

export const Accordion = toReact(useAccordion);
Accordion.displayName = 'Accordion';
