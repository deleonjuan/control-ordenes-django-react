import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
// import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Header from './layouts/Header';
import Products from './products/products'

import { Provider } from 'react-redux'
import store from '../store'

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Fragment>
                    <Header />
                    <div>
                        <h2>hola a react</h2>
                    </div>

                    <Products/>

                </Fragment>
            </Provider>
        )
    };
}

ReactDOM.render(<App />, document.getElementById('app'))
