import React from 'react';
import { Rating as MuiRating, type RatingProps as MuiRatingProps } from '@mui/material';
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
            value: number | null;
            onChange?: (value: number | null) => void;
            max?: number;
            precision?: number;
            size?: MuiRatingProps['size'];
            readOnly?: boolean;
            sx?: MuiRatingProps['sx'];
        };
    }
>;

export const useRating = (params: ComponentParams<Struct>): Component<Struct> => {
    let c: Component<Struct>;
    let m: ComponentModel<Struct>;

    const def: ComponentDef<Struct> = {
        regType: 'Rating',
        props: {
            value: null,
            onChange: undefined,
            max: 5,
            precision: 1,
            size: 'medium',
            readOnly: false,
            sx: undefined,
        },
        view: () => (
            <MuiRating
                value={m.value}
                onChange={(_, newValue) => m.onChange?.(newValue)}
                max={m.max}
                precision={m.precision}
                size={m.size}
                readOnly={m.readOnly}
                disabled={m.$.isDisabled}
                sx={m.sx}
            />
        ),
    };

    c = useComponent(def, params);
    m = c.model;
    return c;
};

export type RatingStruct = Struct;

export const Rating = toReact(useRating);
Rating.displayName = 'Rating';
