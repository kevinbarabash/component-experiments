// @flow

import React, {Component} from 'react';

import Button from './button';
import type {CommonButtonProps} from './types';

export default class DomainButton extends Component {
    props: CommonButtonProps & {
        domain: 'math' | 'science' | 'philosophy' | 'default'
    }

    static defaultProps = {
        domain: 'default',
    }

    render() {
        const color = 'blue';
        const activeColor = 'darkBlue';

        const props = {
            color: 'blue',
            activeColor: 'darkBlue',
            width: this.props.width,
        };

        return <Button {...props}>
            {this.props.children}
        </Button>;
    }
}
