import React from 'react';
import {
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Radio,
    RadioGroup as MuiRadioGroup,
    type RadioProps as MuiRadioProps,
    type FormControlProps as MuiFormControlProps,
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

export type RadioOption = {
    value: string;
    label: string;
};

type Struct<TMsgStruct extends BaseAppMsgStruct = BaseAppMsgStruct> = ComponentStruct<
    TMsgStruct,
    {
        props: {
            value: string;
            onChange: (value: string) => void;
            options: RadioOption[];
            label?: string;
            helperText?: string;
            error?: boolean;
            row?: boolean;
            color?: MuiRadioProps['color'];
            size?: MuiRadioProps['size'];
            sx?: MuiFormControlProps['sx'];
        };
    }
>;

export const useRadioGroup = (params: ComponentParams<Struct>): Component<Struct> => {
    let c: Component<Struct>;
    let m: ComponentModel<Struct>;

    const def: ComponentDef<Struct> = {
        regType: 'RadioGroup',
        props: {
            value: '',
            onChange: () => {},
            options: [],
            label: undefined,
            helperText: undefined,
            error: false,
            row: false,
            color: 'primary',
            size: 'medium',
            sx: undefined,
        },
        view: () => {
            const labelId = `${c.id}-label`;
            return (
                <FormControl error={m.error} disabled={m.$.isDisabled} sx={m.sx}>
                    {m.label && <FormLabel id={labelId}>{m.label}</FormLabel>}
                    <MuiRadioGroup
                        aria-labelledby={m.label ? labelId : undefined}
                        name={c.id}
                        value={m.value}
                        onChange={(e) => m.onChange(e.target.value)}
                        row={m.row}
                    >
                        {m.options.map((opt) => (
                            <FormControlLabel
                                key={opt.value}
                                value={opt.value}
                                label={opt.label}
                                control={<Radio color={m.color} size={m.size} />}
                            />
                        ))}
                    </MuiRadioGroup>
                    {m.helperText && <FormHelperText>{m.helperText}</FormHelperText>}
                </FormControl>
            );
        },
    };

    c = useComponent(def, params);
    m = c.model;
    return c;
};

export type RadioGroupStruct = Struct;

export const RadioGroup = toReact(useRadioGroup);
RadioGroup.displayName = 'RadioGroup';
