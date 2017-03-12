// @flow

import React, {Children, Component} from 'react';

import HoverPressBehavior from './hover-press-behavior';
import RoundRect from './round-rect';
import type {CommonButtonProps} from './types';

export default class ScratchpadButton extends Component {
    props: CommonButtonProps & {
        children?: Children,
        type: 'PRIMARY' | 'SECONDARY' | 'OTHER',
    }

    static defaultProps = {
        type: 'PRIMARY',
    }

    render() {
        return <HoverPressBehavior>
            {({ hovered, pressed, focused }, handlers) => {
                const active = hovered || pressed;

                const background = active ? '#EEE' : 'transparent';
                const props = {
                    ...handlers,
                    textColor: 'green',
                    backgroundColor: background,
                    borderColor: background,
                    focusColor: focused ? 'pink' : 'transparent',
                    size: 'medium',
                    tag: 'button',
                };

                return <RoundRect {...props}>{this.props.children}</RoundRect>;
            }}
        </HoverPressBehavior>;
    }
}
