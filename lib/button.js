// @flow
import React, {Component} from 'react';

import HoverPressBehavior from './hover-press-behavior';
import RoundRect from './round-rect';
import type {CommonButtonProps} from './types';

export default class Button extends Component {
    props: CommonButtonProps & {
        activeColor: string,
        color: string,
        size: 'small' | 'medium' | 'large',
        type: 'PRIMARY' | 'SECONDARY',
    }

    static defaultProps = {
        activeColor: 'darkGreen',
        color: 'green',
        size: 'large',
        type: 'PRIMARY',
    }

    render() {
        const {
            activeColor,
            color,
            disabled,
            href,
            type,
            ...rest,
        } = this.props;

        return <HoverPressBehavior>
            {({hovered, pressed, focused}, handlers) => {
                const active = hovered || pressed;
                const style = type === 'PRIMARY' ? solidStyle : outlineStyle;
                const props = {
                    ...style(active
                        ? (disabled ? 'lightgray' : activeColor)
                        : (disabled ? 'lightgray' : color)
                    ),
                    ...handlers,
                    ...rest,
                    disabled,
                    focusColor: focused ? 'pink' : 'transparent',
                    tag: href ? 'a' : 'button',
                };

                return <RoundRect {...props} />;
            }}
        </HoverPressBehavior>;
    }
}

const solidStyle = (color) => ({
    textColor: 'white',
    backgroundColor: color,
    borderColor: color,
});

const outlineStyle = (color, backgroundColor = 'transparent') => ({
    textColor: color,
    backgroundColor: backgroundColor,
    borderColor: color,
});
