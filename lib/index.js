// @flow

import React, {Children, Component} from 'react';
import ReactDOM from 'react-dom';
import {css, StyleSheet} from 'aphrodite';

import Button from './button';
import DomainButton from './domain-button';
import RoundRect from './round-rect';
import ScratchpadButton from './scratchpad-button';

class App extends Component {
    render() {
        return <div>
            <p>
                <Button type='SECONDARY'>Hello, world</Button>
            </p>
            <p>
                <Button width={250}>Hello, world</Button>
            </p>
            <p>
                <Button disabled width={250}>Hello, world</Button>
            </p>
            <p>
                <Button disabled type='SECONDARY'>Hello, world</Button>
            </p>
            <p>
                <DomainButton size='small' width='100%'>Hello, world</DomainButton>
            </p>
            <p>
                <ScratchpadButton>Hello, world</ScratchpadButton>
            </p>
            <p>
                <RoundRect corners='topLeft' textColor='gray' backgroundColor='white' borderColor='gray'>
                    Tab 1
                </RoundRect>
                <RoundRect corners='topCenter' textColor='gray' backgroundColor='pink' borderColor='gray'>
                    Tab 2
                </RoundRect>
                <RoundRect corners='topRight' textColor='gray' backgroundColor='white' borderColor='gray'>
                    Tab 3
                </RoundRect>
            </p>
        </div>;
    }
}


ReactDOM.render(<App/>, document.getElementById('container'));
