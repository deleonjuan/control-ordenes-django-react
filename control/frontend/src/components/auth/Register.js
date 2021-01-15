import React, { Component, Fragment } from 'react';

class Register extends Component {

    state = {
        username: '',
        password: ''
    }

    render() {
        return (
            <div>
                <form>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="email" className="form-control" id="username" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Correo</label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password2" className="form-label">repetir Password</label>
                        <input type="password" className="form-control" id="password2" />
                    </div>
                    <button type="submit" className="btn btn-primary">Ingresar</button>
                </form>
            </div>
        )
    };
}

export default Register