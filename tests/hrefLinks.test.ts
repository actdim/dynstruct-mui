import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, it, expect } from 'vitest';
import { ComponentContextProvider } from '@actdim/dynstruct/componentModel/react/componentContext';
import { createMsgBus } from '@actdim/msgmesh/core';
import { type BaseAppMsgStruct } from '@actdim/dynstruct/appDomain/appContracts';
import { Button } from '../src/Button';
import { IconButton } from '../src/IconButton';
import { List } from '../src/List';

// feat--href-link-controls: controls with href render real links (middle-click / new tab work natively).

const renderWithBus = (node: ReturnType<typeof createElement>): string => {
    const msgBus = createMsgBus<BaseAppMsgStruct>();

    // emotion injects <style> tags in front of server markup
    return renderToStaticMarkup(createElement(ComponentContextProvider, { value: { msgBus } }, node)).replace(/<style[^>]*>[^<]*<\/style>/g, '');
};

describe('href link controls', () => {
    it('Button with href renders an anchor', () => {
        const html = renderWithBus(createElement(Button, { label: 'Library', href: '/library' }));
        expect(html).toMatch(/^<a [^>]*href="\/library"/);
    });

    it('Button without href stays a button', () => {
        const html = renderWithBus(createElement(Button, { label: 'Save' }));
        expect(html.startsWith('<button')).toBe(true);
    });

    it('IconButton with href renders an anchor', () => {
        const html = renderWithBus(createElement(IconButton, { icon: 'i', title: 'Inbox', href: '/inbox' }));
        expect(html).toMatch(/^<a [^>]*href="\/inbox"/);
    });

    it('List item with href renders an anchor', () => {
        const html = renderWithBus(createElement(List, { items: [{ primary: 'Groups', href: '/groups' }] }));
        expect(html).toMatch(/<a [^>]*href="\/groups"/);
    });
});
