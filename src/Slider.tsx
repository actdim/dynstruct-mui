import React from 'react';
import { Slider as MuiSlider, type SliderProps as MuiSliderProps } from '@mui/material';
import {
    type ComponentStruct,
    type ComponentDef,
    type ComponentParams,
    type Component,
    type ComponentModel,
} from '@actdim/dynstruct/componentModel/contracts';
import { useComponent, toReact } from '@actdim/dynstruct/componentModel/react/hooks';
import { type BaseAppMsgStruct } from '@actdim/dynstruct/appDomain/appContracts';

type Struct<TMsgStruct extends BaseAppMsgStruct = BaseAppMsgStruct> = ComponentStruct<
    TMsgStruct,
    {
        props: {
            value: number;
            onChange: (value: number) => void;
            min?: number;
            max?: number;
            step?: number;
            marks?: boolean;
            color?: MuiSliderProps['color'];
            size?: MuiSliderProps['size'];
            valueLabelDisplay?: MuiSliderProps['valueLabelDisplay'];
            track?: MuiSliderProps['track'];
            sx?: MuiSliderProps['sx'];
        };
    }
>;

export const useSlider = (params: ComponentParams<Struct>): Component<Struct> => {
    let c: Component<Struct>;
    let m: ComponentModel<Struct>;

    const def: ComponentDef<Struct> = {
        regType: 'Slider',
        props: {
            value: 0,
            onChange: () => {},
            min: 0,
            max: 100,
            step: 1,
            marks: false,
            color: 'primary',
            size: 'medium',
            valueLabelDisplay: 'auto',
            track: 'normal',
            sx: undefined,
        },
        view: () => (
            <MuiSlider
                value={m.value}
                onChange={(_, newValue) => m.onChange(newValue as number)}
                min={m.min}
                max={m.max}
                step={m.step}
                marks={m.marks}
                color={m.color}
                size={m.size}
                valueLabelDisplay={m.valueLabelDisplay}
                track={m.track}
                disabled={m.$.isDisabled}
                sx={m.sx}
            />
        ),
    };

    c = useComponent(def, params);
    m = c.model;
    return c;
};

export type SliderStruct = Struct;

export const Slider = toReact(useSlider);
Slider.displayName = 'Slider';
