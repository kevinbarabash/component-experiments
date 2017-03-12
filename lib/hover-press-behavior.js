// @flow
import React, {Component} from 'react';

export default class HoverPressBehavior extends Component {
    state: {
        focused: boolean,
        hovered: boolean,
        pressed: boolean,
    }

    state = {
        focused: false,
        hovered: false,
        pressed: false,
    }

    focusFlag: boolean
    waitingForClick: boolean

    handleClick = () => {
        console.log('click');
        this.waitingForClick = false;
    }

    handleMouseEnter = () => {
        if (!this.waitingForClick) {
            this.setState({hovered: true});
        }
    }

    handleMouseLeave = () => {
        if (!this.waitingForClick) {
            this.setState({hovered: false});
        }
    }

    handleTouchStart = () => {
        this.setState({pressed: true});
    }

    handleTouchEnd = () => {
        this.setState({pressed: false});

        this.waitingForClick = true;
    }

    handleMouseDown = () => {
        this.setState({focused: false});
        this.focusFlag = true;
    }

    handleBlur = () => {
        this.setState({focused: false});
    }

    handleFocus = () => {
        if (this.focusFlag) {
            this.focusFlag = false;
        } else {
            this.setState({focused: true});
        }
    }

    render() {
        const handlers = {
            onBlur: this.handleBlur,
            onClick: this.handleClick,
            onFocus: this.handleFocus,
            onMouseDown: this.handleMouseDown,
            onMouseEnter: this.handleMouseEnter,
            onMouseLeave: this.handleMouseLeave,
            onTouchStart: this.handleTouchStart,
            onTouchEnd: this.handleTouchEnd,
        }

        return this.props.children(this.state, handlers);
    }
}
