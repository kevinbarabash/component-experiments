// @flow

import React, {Children, Component} from 'react';

import ButtonBehavior from './button-behavior';
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
        return <ButtonBehavior>
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
        </ButtonBehavior>;
    }
}
