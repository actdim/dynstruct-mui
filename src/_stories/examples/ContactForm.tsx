import React from 'react';
import {
    type ComponentStruct,
    type ComponentDef,
    type ComponentParams,
    type Component,
    type ComponentModel,
} from '@actdim/dynstruct/componentModel/contracts';
import { useComponent, toReact } from '@actdim/dynstruct/componentModel/react/hooks';
import { bind, bindField, prop } from '@actdim/dynstruct/componentModel/core';
import { useTextField, type TextFieldStruct } from '../../TextField';
import { useSelect, type SelectStruct } from '../../Select';
import { useCheckbox, type CheckboxStruct } from '../../Checkbox';
import { useButton, type ButtonStruct } from '../../Button';
import { type AppMsgStruct } from '../bootstrap';

type Struct = ComponentStruct<
    AppMsgStruct,
    {
        props: {
            name: string;
            email: string;
            confirmEmail: string;
            topic: string;
            agree: boolean;
            submitting: boolean;
            result: string;
        };
        actions: {
            submit: () => Promise<void>;
            reset: () => void;
        };
        children: {
            nameField: TextFieldStruct;
            emailField: TextFieldStruct;
            confirmEmailField: TextFieldStruct;
            topicField: SelectStruct;
            agreeField: CheckboxStruct;
            submitBtn: ButtonStruct;
            resetBtn: ButtonStruct;
            resultView: React.FC;
        };
    }
>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Simulated server call: one address is "already registered".
const fakeRegister = (email: string): Promise<{ ok: boolean }> =>
    new Promise((resolve) => setTimeout(() => resolve({ ok: email !== 'taken@example.com' }), 300));

export const useContactForm = (params: ComponentParams<Struct>): Component<Struct> => {
    let c: Component<Struct>;
    let m: ComponentModel<Struct>;

    const agree = bindField(() => c, 'agree');

    const def: ComponentDef<Struct> = {
        regType: 'ContactForm',
        props: {
            name: prop({
                initialValue: '',
                validator: {
                    onBlur: true,
                    validate: (v: string) =>
                        v.trim() ? undefined : { isValid: false, message: 'Name is required' },
                },
            }),
            email: prop({
                initialValue: '',
                validator: {
                    onBlur: true,
                    validate: (v: string) =>
                        !v.trim()
                            ? { isValid: false, message: 'Email is required' }
                            : EMAIL_RE.test(v)
                              ? undefined
                              : { isValid: false, message: 'Invalid email address' },
                },
            }),
            // Cross-field rule: reads the closure `m`.
            confirmEmail: prop({
                initialValue: '',
                validator: {
                    onBlur: true,
                    validate: (v: string) =>
                        v === m.email ? undefined : { isValid: false, message: 'Emails do not match' },
                },
            }),
            topic: prop({
                initialValue: '',
                validator: {
                    validate: (v: string) => (v ? undefined : { isValid: false, message: 'Pick a topic' }),
                },
            }),
            agree: prop({
                initialValue: false,
                validator: {
                    validate: (v: boolean) =>
                        v ? undefined : { isValid: false, message: 'You must accept the terms' },
                },
            }),
            submitting: false,
            result: '',
        },
        actions: {
            submit: async () => {
                m.result = '';
                if (!(await c.validate())) {
                    return;
                }
                m.submitting = true;
                try {
                    const res = await fakeRegister(m.email);
                    if (!res.ok) {
                        c.setValidation({ email: { isValid: false, message: 'Email already registered' } });
                        return;
                    }
                    m.result = `Submitted: ${m.name} <${m.email}>, topic ${m.topic}`;
                } finally {
                    m.submitting = false;
                }
            },
            reset: () => {
                m.name = '';
                m.email = '';
                m.confirmEmail = '';
                m.topic = '';
                m.agree = false;
                m.result = '';
                c.resetValidation();
            },
        },
        children: {
            nameField: useTextField({ label: 'Name', fullWidth: true, ...bindField(() => c, 'name') }),
            emailField: useTextField({
                label: 'Email',
                type: 'email',
                fullWidth: true,
                ...bindField(() => c, 'email', { hint: () => 'Try taken@example.com' }),
            }),
            confirmEmailField: useTextField({
                label: 'Confirm email',
                type: 'email',
                fullWidth: true,
                ...bindField(() => c, 'confirmEmail'),
            }),
            topicField: useSelect({
                label: 'Topic',
                fullWidth: true,
                options: [
                    { value: 'sales', label: 'Sales' },
                    { value: 'support', label: 'Support' },
                ],
                ...bindField(() => c, 'topic'),
            }),
            agreeField: useCheckbox({
                label: 'I accept the terms',
                checked: agree.value,
                error: agree.error,
                helperText: agree.helperText,
                onBlur: agree.onBlur,
            }),
            submitBtn: useButton({
                label: 'Submit',
                variant: 'contained',
                fullWidth: true,
                loading: bind(() => m.submitting),
                onClick: () => {
                    void m.submit();
                },
            }),
            resetBtn: useButton({
                label: 'Reset',
                fullWidth: true,
                onClick: () => {
                    m.reset();
                },
            }),
            resultView: () => (m.result ? <div data-testid="contact-result">{m.result}</div> : null),
        },
        view: () => (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
                <c.children.NameField />
                <c.children.EmailField />
                <c.children.ConfirmEmailField />
                <c.children.TopicField />
                <c.children.AgreeField />
                <c.children.SubmitBtn />
                <c.children.ResetBtn />
                <c.children.ResultView />
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
