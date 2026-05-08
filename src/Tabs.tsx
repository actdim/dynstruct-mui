import React from 'react';
import { Tabs as MuiTabs, Tab as MuiTab, type TabsProps as MuiTabsProps } from '@mui/material';
import {
    type ComponentStruct,
    type ComponentDef,
    type ComponentParams,
    type Component,
    type ComponentModel,
} from '@actdim/dynstruct/componentModel/contracts';
import { useComponent, toReact } from '@actdim/dynstruct/componentModel/react/react';
import { type BaseAppMsgStruct } from '@actdim/dynstruct/appDomain/appContracts';

export type TabItem = {
    value: string;
    label: string;
    content?: React.FC;
    disabled?: boolean;
};

type Struct<TMsgStruct extends BaseAppMsgStruct = BaseAppMsgStruct> = ComponentStruct<
    TMsgStruct,
    {
        props: {
            value: string;
            onChange: (value: string) => void;
            tabs: TabItem[];
            orientation?: MuiTabsProps['orientation'];
            variant?: MuiTabsProps['variant'];
            sx?: MuiTabsProps['sx'];
        };
    }
>;

export const useTabs = (params: ComponentParams<Struct>): Component<Struct> => {
    let c: Component<Struct>;
    let m: ComponentModel<Struct>;

    const def: ComponentDef<Struct> = {
        regType: 'Tabs',
        props: {
            value: '',
            onChange: () => {},
            tabs: [],
            orientation: 'horizontal',
            variant: 'standard',
            sx: undefined,
        },
        view: () => (
            <>
                <MuiTabs
                    value={m.value}
                    onChange={(_, v: string) => m.onChange(v)}
                    orientation={m.orientation}
                    variant={m.variant}
                    sx={m.sx}
                >
                    {m.tabs.map((tab) => (
                        <MuiTab key={tab.value} value={tab.value} label={tab.label} disabled={tab.disabled} />
                    ))}
                </MuiTabs>
                {m.tabs.map((tab) => {
                    const Content = tab.content;
                    return (
                        <div key={tab.value} role="tabpanel" hidden={m.value !== tab.value}>
                            {m.value === tab.value && Content && <Content />}
                        </div>
                    );
                })}
            </>
        ),
    };

    c = useComponent(def, params);
    m = c.model;
    return c;
};

export type TabsStruct = Struct;

export const Tabs = toReact(useTabs);
Tabs.displayName = 'Tabs';
