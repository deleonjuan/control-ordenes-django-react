import React, { Component } from "react";
import ReactDom from 'react-dom';

class App extends Component {
    render() {
        return (
            <div>
                <h2>hola a react</h2>
            </div>
        )
    };
}

ReactDom.render(<App/>, document.getElementById('app'))
