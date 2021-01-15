import React, { Component } from 'react';
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import { onRegister } from '../../reducers/auth'
import { Redirect } from 'react-router-dom';

class Register extends Component {

    static propTypes = {
        onRegister: propTypes.func.isRequired,
        isLogin: propTypes.bool
    }

    state = {
        username: '',
        password: '',
        repassword: '',
        email: ''
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    onSubmit = e => {
        e.preventDefault()
        // const { username, password, email, repassword } = this.props
        if (this.state.password === this.state.repassword) {
            const newUser = {
                email: this.state.email,
                username: this.state.username,
                password: this.state.password,
            }
            this.props.onRegister(newUser)
        }
        else alert("las contraseñas no son iguales")
    }

    render() {
        if (this.props.isLogin) {
            return <Redirect to="/" />;
        }
        const { username, password, email, repassword } = this.props
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" className="form-control" name="username" onChange={this.onChange} value={username} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Correo</label>
                        <input type="email" className="form-control" name="email" aria-describedby="emailHelp" onChange={this.onChange} value={email} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" onChange={this.onChange} value={password} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="repassword" className="form-label">repetir Password</label>
                        <input type="password" className="form-control" name="repassword" onChange={this.onChange} value={repassword} />
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

export default connect(mapstateToProps, { onRegister })(Register)