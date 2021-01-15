import axios from 'axios'

// types
const IS_LOADING = "IS_LOADING"
const IS_READY = "IS_READY"
const AUTH_ERROR = "AUTH_ERROR"
const LOGIN_SUCCESS = "LOGIN_SUCCESS"

//reducer
const initialState = {
    token: localStorage.getItem('token'),
    isLogin: false,
    isLoading: false,
    user: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case IS_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case IS_READY:
            return {
                ...state,
                isLogin: true,
                isLoading: false,
                user: action.payload
            }
        case AUTH_ERROR:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                user: null,
                isLogin: false,
                isLoading: false
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                ...action.payload,
                isLoading: false,
                isLogin: true
            }
        default:
            return state
    }
}

//actions
export const LoadUser = () => (dispatch, getState) => {
    // activar el isloading
    dispatch({ type: IS_LOADING })
    //obtener usuario
    axios.get('/auth/user', tokenConfig(getState))
        .then(res => {
            dispatch({ type: IS_READY, payload: res.data })
        })
        .catch(err => {
            console.log(err);
            dispatch({ type: AUTH_ERROR })
        })
}

export const onLogin = (username, password) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    //preparar los datos
    const body = JSON.stringify({ username, password });

    axios.post('/auth/login', body, config)
        .then((res) => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            console.log(err);
            dispatch({ type: AUTH_ERROR });
        });
};

export const onRegister = ({ username, password, email }) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    //preparar los datos
    const body = JSON.stringify({ username, email, password });

    axios.post('/auth/register', body, config)
        .then((res) => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
        })
        .catch((err) => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({type: REGISTER_FAIL});
        });
};

export const onLogout = () => (dispatch, getState) => {
    axios
        .post('/auth/logout/', null, tokenConfig(getState))
        .then((res) => {
            dispatch({ type: 'CLEAR_LEADS' });
            dispatch({
                type: AUTH_ERROR,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

export const tokenConfig = (getState) => {
    // obtener el token
    const token = getState().auth.token;
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    // si existe el token se añade al header
    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    return config;
};