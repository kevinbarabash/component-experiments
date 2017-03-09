import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Foo extends Component {
    render() {
        return <h1>Hello, world</h1>;
    }
}

ReactDOM.render(<Foo/>, document.getElementById('container'));
