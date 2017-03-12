// @flow

import React, {Children, Component} from 'react';
import ReactDOM from 'react-dom';
import {css, StyleSheet} from 'aphrodite';

import Button from './button';
import DomainButton from './domain-button';
import RoundRect from './round-rect';
import ScratchpadButton from './scratchpad-button';
import TestPrepDropdown from './test-prep-dropdown';

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
                <TestPrepDropdown/>
            </p>
            <p>
                Some random text below the dropdown.
            </p>
        </div>;
    }
}


ReactDOM.render(<App/>, document.getElementById('container'));
