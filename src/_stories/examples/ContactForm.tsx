import React from 'react';
import {
    type ComponentStruct,
    type ComponentDef,
    type ComponentParams,
    type Component,
    type ComponentModel,
} from '@actdim/dynstruct/componentModel/contracts';
import { useComponent, toReact } from '@actdim/dynstruct/componentModel/react/react';
import { bind, bindProp } from '@actdim/dynstruct/componentModel/core';
import { useTextField, type TextFieldStruct } from '../../TextField';
import { useButton, type ButtonStruct } from '../../Button';
import { type AppMsgStruct } from '../bootstrap';

type Struct = ComponentStruct<
    AppMsgStruct,
    {
        props: {
            name: string;
            email: string;
        };
        children: {
            nameField: TextFieldStruct;
            emailField: TextFieldStruct;
            submitBtn: ButtonStruct;
        };
    }
>;

const isEmailValid = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const useContactForm = (params: ComponentParams<Struct>): Component<Struct> => {
    let c: Component<Struct>;
    let m: ComponentModel<Struct>;

    const canSubmit = () => m.name.trim().length > 0 && isEmailValid(m.email);

    const def: ComponentDef<Struct> = {
        regType: 'ContactForm',
        props: {
            name: '',
            email: '',
        },
        children: {
            nameField: useTextField({
                label: 'Name',
                value: bindProp(() => m, 'name'),
                fullWidth: true,
            }),
            emailField: useTextField({
                label: 'Email',
                type: 'email',
                value: bindProp(() => m, 'email'),
                fullWidth: true,
                error: bind(() => m.email.length > 0 && !isEmailValid(m.email)),
                helperText: bind(() =>
                    m.email.length > 0 && !isEmailValid(m.email)
                        ? 'Invalid email address'
                        : undefined,
                ),
            }),
            submitBtn: useButton({
                label: 'Submit',
                fullWidth: true,
                onClick: () => {
                    alert(`Submitted:\nName: ${m.name}\nEmail: ${m.email}`);
                },
            }),
        },
        events: {
            onChangeName: () => {
                c.children.submitBtn.model.$.isDisabled = !canSubmit();
            },
            onChangeEmail: () => {
                c.children.submitBtn.model.$.isDisabled = !canSubmit();
            },
            onInit: () => {
                c.children.submitBtn.model.$.isDisabled = true;
            },
        },
        view: () => (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
                <c.children.NameField />
                <c.children.EmailField />
                <c.children.SubmitBtn />
            </div>
        ),
    };

    c = useComponent(def, params);
    m = c.model;
    return c;
};

export type ContactFormStruct = Struct;

export const ContactForm = toReact(useContactForm);
ContactForm.displayName = 'ContactForm';
