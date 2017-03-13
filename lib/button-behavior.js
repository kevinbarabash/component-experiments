// @flow
import React, {Component} from 'react';

type Props = {
    children?: Function,
    startPressed: boolean,
    startHovered: boolean,
    shouldUpdate: () => boolean,
};

export default class ButtonBehavior extends Component {
    state: {
        focused: boolean,
        hovered: boolean,
        pressed: boolean,
    }

    constructor(props: Props) {
        super(props);

        this.state = {
            focused: false,
            hovered: props.startHovered,
            pressed: props.startPressed,
        }
    }

    focusFlag: boolean
    waitingForClick: boolean
    props: Props

    static defaultProps = {
        startHovered: false,
        startPressed: false,
        shouldUpdate: () => true,
    }

    handleClick = () => {
        if (this.props.shouldUpdate()) {
            this.waitingForClick = false;
        }
    }

    handleMouseEnter = () => {
        if (this.props.shouldUpdate() && !this.waitingForClick) {
            this.setState({hovered: true});
        }
    }

    handleMouseLeave = () => {
        if (this.props.shouldUpdate() && !this.waitingForClick) {
            this.setState({hovered: false});
        }
    }

    handleTouchStart = () => {
        if (this.props.shouldUpdate()) {
            this.setState({ pressed: true });
        }
    }

    handleTouchEnd = () => {
        if (this.props.shouldUpdate()) {
            this.setState({ pressed: false });
            this.waitingForClick = true;
        }
    }

    handleMouseDown = () => {
        if (this.props.shouldUpdate()) {
            this.setState({focused: false});
            this.focusFlag = true;
        }
    }

    handleBlur = () => {
        if (this.props.shouldUpdate()) {
            this.setState({focused: false});
        }
    }

    handleFocus = () => {
        if (this.props.shouldUpdate()) {
            if (this.focusFlag) {
                this.focusFlag = false;
            } else {
                this.setState({focused: true});
            }
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

        const {children} = this.props;

        return children && children(this.state, handlers);
    }
}
