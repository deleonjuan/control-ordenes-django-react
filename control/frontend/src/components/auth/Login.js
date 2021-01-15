import React, { Component } from 'react';
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import { onLogin } from '../../reducers/auth'
import { Redirect } from 'react-router-dom';

class Login extends Component {

    static propTypes = {
        onLogin: propTypes.func.isRequired,
        isLogin: propTypes.bool
    }

    state = {
        username: '',
        password: ''
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    onSubmit = e => {
        e.preventDefault()
        this.props.onLogin(this.state.username, this.state.password)
    }

    render() {

        if (this.props.isLogin) {
            return <Redirect to="/" />
        }

        const { username, password } = this.state
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" className="form-control" name="username" id="username" onChange={this.onChange} value={username} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" id="password" onChange={this.onChange} value={password} />
                    </div>
                    <button type="submit" className="btn btn-primary">Ingresar</button>
                </form>
            </div>
        )
    };
}

const mapstateToProps = state => ({
    isLogin: state.auth.isLogin
})

export default connect(mapstateToProps, { onLogin })(Login)