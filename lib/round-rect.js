// @flow
import React, {Children, Component} from 'react';
import {css, StyleSheet} from 'aphrodite';

export default class RoundRect extends Component {
    props: {
        children?: Children,

        backgroundColor: string,
        borderColor: string,
        focusColor?: string,
        textColor: string,

        corners: 'top' | 'left' | 'bottom' | 'right'
        | 'topLeft' | 'topRight' | 'bottomRight' | 'bottomLeft'
        | 'all' | 'none',

        size: 'tiny' | 'small' | 'medium' | 'large',
        width?: number | string,

        tag: string,
    }

    static defaultProps = {
        corners: 'all',
        size: 'medium',
        tag: 'div',
    }

    render() {
        const {
            children,
            textColor,
            borderColor,
            backgroundColor,
            focusColor,
            corners,
            size,
            width,
            tag,
            ...otherProps  // TODO(kevinb) limit this to handlers
        } = this.props;

        const dynamic = {
            color: this.props.textColor,
            borderColor: this.props.borderColor,
            backgroundColor: this.props.backgroundColor,
            width: this.props.width,
            boxShadow: focusColor && `0px 0px 4px 4px ${focusColor}`
        }

        const clear = {
            'a': styles.link,
            'button': styles.button,
        }[this.props.tag] || {};

        return React.createElement(this.props.tag, {
            className: css(
                clear,
                styles.common,
                styles[this.props.corners],
                styles[this.props.size],
            ),
            style: dynamic,
            ...otherProps,
        }, this.props.children);
    }
}

const styles = StyleSheet.create({
    common: {
        display: 'inline-block',
        fontFamily: 'sans-serif',
        borderStyle: 'solid',
        boxSizing: 'border-box',
        textAlign: 'center',

        cursor: 'pointer',

        MozAppearance: 'none',
        WebkitAppearance: 'none',
        WebkitTapHighlightColor: 'transparent',

        ':focus': {
            outline: 'none',
        }
    },

    top: {
        borderWidth: `1px 1px 0px 1px`,
        borderRadius: `4px 4px 0px 0px`,
    },

    left: {
        borderWidth: `1px 0px 1px 1px`,
        borderRadius: `4px 0px 0px 4px`,
    },

    bottom: {
        borderWidth: `0px 1px 1px 1px`,
        borderRadius: `0px 0px 4px 4px`,
    },

    right: {
        borderWidth: `1px 1px 1px 0px`,
        borderRadius: `0px 4px 4px 0px`,
    },

    topLeft: {
        borderWidth: `1px 0px 0px 1px`,
        borderRadius: `4px 0px 0px 0px`,
    },

    topRight: {
        borderWidth: `1px 1px 0px 0px`,
        borderRadius: `0px 4px 0px 0px`,
    },

    bottomRight: {
        borderWidth: `0px 1px 1px 0px`,
        borderRadius: `0px 0px 4px 0px`,
    },

    bottomLeft: {
        borderWidth: `0px 0px 1px 1px`,
        borderRadius: `0px 0px 0px 4px`,
    },

    topCenter: {
        borderWidth: `1px 0px 0px 0px`,
        borderRadius: 0,
    },

    rightCenter: {
        borderWidth: `0px 1px 0px 0px`,
        borderRadius: 0,
    },

    bottomCenter: {
        borderWidth: `0px 0px 1px 0px`,
        borderRadius: 0,
    },

    leftCenter: {
        borderWidth: `1px 0px 0px 1px`,
        borderRadius: 0,
    },

    all: {
        borderWidth: 1,
        borderRadius: 4,
    },

    small: {
        fontSize: 12,
        height: 24,
        lineHeight: '14px',
        padding: '0px 8px',
    },

    medium: {
        fontSize: 15,
        height: 32,
        lineHeight: '30px',
        padding: '0px 12px',
    },

    medium: {
        fontSize: 15,
        height: 40,
        lineHeight: '37px',
        padding: '0px 16px',
    },

    large: {
        height: 48,
        padding: '0px 16px',

        fontSize: 15,
        lineHeight: '45px',
    },

    link: {
        textDecoration: 'inherit',
    },

    button: {
        fontSize: 'inherit',
        fontFamily: 'inherit',
        padding: 'none',
        margin: 'none',
    },
});
