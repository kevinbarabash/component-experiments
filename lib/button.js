// @flow
import React, {Component} from 'react';

import ButtonBehavior from './button-behavior';
import RoundRect from './round-rect';
import {solidStyle, outlineStyle} from './button-utils';
import type {CommonButtonProps} from './types';

export default class Button extends Component {
    props: CommonButtonProps & {
        activeColor: string,
        color: string,
        size: 'tiny' | 'small' | 'medium' | 'large',
        startHovered: boolean,
        startPressed: boolean,
        type: 'PRIMARY' | 'SECONDARY',
    }

    static defaultProps = {
        activeColor: 'darkGreen',
        color: 'green',
        size: 'medium',
        startHovered: false,
        startPressed: false,
        type: 'PRIMARY',
    }

    render() {
        const {
            activeColor,
            color,
            disabled,
            href,
            startHovered,
            startPressed,
            type,
            ...rest,
        } = this.props;

        return <ButtonBehavior
            startHovered={startHovered}
            startPressed={startPressed}
        >
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
        </ButtonBehavior>;
    }
}
