// @flow

import React, {Children, Component} from 'react';
import ReactDOM from 'react-dom';
import {css, StyleSheet} from 'aphrodite';

class ButtonBehavior extends Component {
    state: {
        pressed: boolean,
        hovered: boolean,
    }

    state = {
        pressed: false,
        hovered: false,
    }

    handleMouseEnter = () => {
        this.setState({hovered: true});
        this.setState({pressed: true});
    }

    handleMouseLeave = () => {
        this.setState({hovered: false});
        this.setState({pressed: false});
    }

    handleTouchStart = () => {

    }

    handleTouchEnd = () => {

    }

    handleBlur = () => {

    }

    render() {
        const handlers = {
            onMouseEnter: this.handleMouseEnter,
            onMouseLeave: this.handleMouseLeave,
        }

        const style = {
            display: 'inline-block',
            cursor: 'pointer',
        }

        return <span {...handlers} style={style}>
            {this.props.children(this.state.hovered, this.state.pressed)}
        </span>
    }
}

type Style = {
    fontWeight?: 'bold' | 'normal',
}

class RoundRect extends Component {
    props: {
        children?: Children,

        textColor: string,

        borderColor: string,

        backgroundColor: string,

        size: 'small' | 'medium' | 'large',

        width?: number | string,

        tag: string,
    }

    static defaultProps = {
        size: 'large',
        tag: 'div',
    }

    render() {
        const dynamic = {
            color: this.props.textColor,
            borderColor: this.props.borderColor,
            backgroundColor: this.props.backgroundColor,
            width: this.props.width,
        }

        const clear = {
            'a': styles.link,
            'button': styles.button,
        }[this.props.tag] || {};

        return React.createElement(this.props.tag, {
            className: css(clear, styles.common, styles[this.props.size]),
            style: dynamic,
        }, this.props.children);
    }
}

const styles = StyleSheet.create({
    common: {
        display: 'inline-block',

        fontFamily: 'sans-serif',

        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 4,

        boxSizing: 'border-box',
    },
    small: {
        fontSize: 12,
        lineHeight: '14px',
        padding: '4px 8px',
    },
    medium: {
        fontSize: 15,
        lineHeight: '18px',
        padding: '6px 12px',
    },
    large: {
        fontSize: 15,
        height: 40,
         padding: '0px 16px',
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

class Button extends Component {
    props: {
        children?: Children,

        size: 'small' | 'medium' | 'large',

        width?: number | string,

        href?: string,
    }

    static defaultProps = {
        size: 'large',
    }

    render() {
        const {href} = this.props;

        return <ButtonBehavior>
            {(hovered, pressed) => {
                const active = hovered || pressed;

                const props = {
                    textColor: 'white',
                    backgroundColor: active ? 'red' : 'blue',
                    borderColor: pressed ? 'lightblue' : 'pink',
                    size: this.props.size,
                    width: this.props.width,
                };

                const tag = href ? 'a' : 'button';

                return <RoundRect {...props} tag={tag}>
                    {this.props.children}
                </RoundRect>;
            }}
        </ButtonBehavior>;
    }
}

class DomainButton extends Component {
    props: {
        children?: Children,
        domain: 'math' | 'science' | 'philosophy'
    }

    render() {
        return <ButtonBehavior>
            {(pressed) => {
                const props = {
                    textColor: 'white',
                    backgroundColor: pressed ? 'red' : 'blue',
                    borderColor: pressed ? 'lightblue' : 'pink',
                    size: 'medium',
                };
                return <RoundRect {...props}>{this.props.children}</RoundRect>;
            }}
        </ButtonBehavior>;
    }
}

class ScratchpadButton extends Component {
    props: {
        children?: Children,
        type: 'PRIMARY' | 'SECONDARY' | 'OTHER',
    }

    static defaultProps = {
        type: 'PRIMARY',
    }

    render() {
        return <ButtonBehavior>
            {(hovered, pressed) => {
                const active = hovered || pressed;

                const background = active ? '#EEE' : 'transparent';
                const props = {
                    textColor: 'green',
                    backgroundColor: background,
                    borderColor: background,
                    size: 'medium',
                };
                return <RoundRect {...props}>{this.props.children}</RoundRect>;
            }}
        </ButtonBehavior>;
    }
}

const clearStyles = StyleSheet.create({
    link: {
        color: 'inherit',
        textDecoration: 'inherit',
    },
    button: {
        border: 'none',
        fontSize: 'inherit',
        fontFamily: 'inherit',
        backgroundColor: 'transparent',
        color: 'inherit',
        padding: 'none',
    },
});

class App extends Component {
    render() {
        return <div>
            <p>
                <Button>Hello, world</Button>
                <Button>Hello, world</Button>
            </p>
            <p>
                <Button size='medium'>Hello, world</Button>
            </p>
            <p>
                <Button size='small'>Hello, world</Button>
            </p>
            <p>
                <ScratchpadButton>Hello, world</ScratchpadButton>
            </p>
        </div>;
    }
}


ReactDOM.render(<App/>, document.getElementById('container'));
