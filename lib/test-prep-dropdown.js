// @flow

import React, {Component} from 'react';
import {css, StyleSheet} from 'aphrodite';

import RoundRect from './round-rect';
import Button from './button';
import HoverPressBehavior from './hover-press-behavior';
import {solidStyle} from './button-utils';

const Spring = () => <div style={{flexGrow: 1, flexShrink: 1}}/>

const Item = ({level, value}) => <div style={{display: 'flex'}}>
    <div style={{width: 24}}/>
    {level}
    <Spring />
    {value}
    <div style={{width: 16}}/>
</div>;

export default class TestPrepDropdown extends Component {
    state = {
        expanded: false,
    }

    handleDrop = () => {
        this.setState({expanded: !this.state.expanded});
    }

    renderButton() {
        const separator = {
            height: 48, // TODO(kevinb) have button export this constant
            width: 1,
            flexGrow: 0,
            flexShrink: 0,
            backgroundColor: 'lightgray',
        }

        const { expanded } = this.state;

        return <HoverPressBehavior shouldUpdate={() => !expanded}>
            {({ hovered, pressed }, handlers) => {
                const active = hovered || pressed;

                const style = solidStyle('#4c00ff');
                const activeStyle = solidStyle('#3800bc');

                const currentStyle = active ? activeStyle : style
                const size = 'large'

                return <div className={css(styles.container)} {...handlers}>
                    <RoundRect
                        {...(expanded ? activeStyle : currentStyle) }
                        corners={expanded ? 'topLeft' : 'left'}
                        width='100%'
                        size={size}
                        onClick={() => console.log('start task')}
                    >
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            Start Task
                            <Spring />
                            1000
                            <div style={{ width: 16 }} />
                        </div>
                    </RoundRect>
                    <div style={separator} />
                    <RoundRect
                        {...currentStyle}
                        corners={expanded ? 'topRight' : 'right'}
                        width={38}
                        size={size}
                        onClick={this.handleDrop}
                    />
                </div>;
            }}
        </HoverPressBehavior>;
    }

    renderDropdown() {
        const separator = {
            height: 48, // TODO(kevinb) dedupe
            width: 1,
            backgroundColor: 'lightgray',
            flexGrow: 0,
            flexShrink: 0,
        }

        const size = 'large';   // TODO(kevinb) dedupe

        const { expanded } = this.state;

        return <HoverPressBehavior>
            {({ hovered, pressed }, handlers) => {
                const active = hovered || pressed;

                const style = solidStyle('#4c00ff');   // baseStyle
                const activeStyle = solidStyle('#3800bc');

                const currentStyle = active ? activeStyle : style

                const choiceProps = {
                    color: '#4c00ff',
                    activeColor: '#3800bc',
                    size: size,
                };

                return <div className={css(styles.dropdownContainer)}>
                    <div className={css(styles.dropdownHeader)}>
                        <RoundRect
                            {...(expanded ? activeStyle : currentStyle) }
                            corners={expanded ? 'topLeft' : 'left'}
                            width='100%'
                            size={size}
                            onClick={() => console.log('start task')}
                        >
                            <div style={{display: 'flex'}}>
                                Start Task
                                <Spring />
                                1000
                                <div style={{ width: 16 }} />
                            </div>
                        </RoundRect>
                        <div style={separator} />
                        <Button
                            {...choiceProps}
                            corners={expanded ? 'topRight' : 'right'}
                            width={38}
                            onClick={this.handleDrop}
                            startHovered={true}
                        />
                    </div>
                    <RoundRect {...style} corners='none'>
                        <div style={{textAlign: 'left'}}>
                            CHOOSE DIFFICULTY LEVEL
                        </div>
                    </RoundRect>
                    <Button {...choiceProps} corners='none'>
                        <Item level='Easy' value={600}/>
                    </Button>
                    <Button {...choiceProps} corners='none'>
                        <Item level='Medium' value={800} />
                    </Button>
                    <Button {...choiceProps} corners='none'>
                        <Item level='Hard' value={1000} />
                    </Button>
                    <Button {...choiceProps} corners='bottom'>
                        <Item level='Cray Cray' value={1500} />
                    </Button>
                </div>;
            }}
        </HoverPressBehavior>;
    }

    render() {
        const {expanded} = this.state;

        return <div style={{position: 'relative'}}>
            {this.renderButton()}
            {expanded && this.renderDropdown()}
        </div>
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        position: 'relative',
        maxWidth: 218,
    },
    dropdownContainer: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        left: 0,
        top: 0,
        maxWidth: 218,
        boxShadow: "0px 0px 10px gray",
        borderRadius: 4,
    },
    dropdownHeader: {
        display: 'flex',
        flexDirection: 'row',
        maxWidth: 218,
    },
});
