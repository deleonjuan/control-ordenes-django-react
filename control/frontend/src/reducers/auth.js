import axios from 'axios'

// types
const IS_LOADING = "IS_LOADING"
const IS_READY = "IS_READY"
const AUTH_ERROR = "AUTH_ERROR"

//reducer
const initialState = {
    token: localStorage.getItem('@token'),
    isLogin: null,
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
        default:
            return state
    }
}

//actions
export const LoadUser = () => (dispatch, getState) => {
    // activar el isloading
    dispatch({ type: IS_LOADING })
    //obtener el token
    const token = getState().auth.token
    //headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    //si el token existe lo incluye en los headers
    if(token){
        config.headers['Authorization'] = `Token ${token}`
    }
    //obtener usuario
    axios.get('/auth/user', config)
    .then(res => {
        dispatch({ type: IS_READY, payload: res.data })
    })
    .catch(err => {
        dispatch({ type: AUTH_ERROR })
    })

}

// export const DeleteProduct = (id) => dispatch => {
//     axios
//         .delete(`/api/products/${id}/`)
//         .then(res => {
//             dispatch({
//                 type: DELETE_PRODUCT,
//                 payload: id
//             })
//         })
//         .catch(err => console.log(err))
// }

// export const AddProduct = (product) => dispatch => {
//     axios
//         .post(`/api/products/`, product)
//         .then(res => {
//             console.log(res.data);
//             dispatch({
//                 type: ADD_PRODUCT,
//                 payload: res.data
//             })
//         })
//         .catch(err => console.log(err))
// }