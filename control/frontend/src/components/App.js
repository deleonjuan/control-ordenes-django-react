import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Header from './layouts/Header';
import Products from './products/products'
import FormProducts from './products/form'
import Login from './auth/Login'
import Register from './auth/Register'
import PrivateRoute from './commons/PrivateRoute'
import Dashboard from '../components/dashboard/dashboard'

import { Provider } from 'react-redux'
import store from '../store'

import { LoadUser } from '../reducers/auth'

const productosDashboard = props => {
    return (
        <>
            <FormProducts />
            <Products />
        </>
    )
}

class App extends Component {

    componentDidMount(){
        store.dispatch(LoadUser())
    }

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Fragment>
                        <Header />
                        <div className="container">

                            <Switch>
                                <PrivateRoute
                                    exact
                                    path='/'
                                    component={productosDashboard} />
                                <Route
                                    exact
                                    path='/home'
                                    component={Dashboard} />
                                <Route
                                    exact
                                    path='/login'
                                    component={Login} />
                                <Route
                                    exact
                                    path='/register'
                                    component={Register} />
                            </Switch>

                        </div>
                    </Fragment>
                </Router>
            </Provider>
        )
    };
}

ReactDOM.render(<App />, document.getElementById('app'))
