import axios from 'axios'

// types
const GET_PRODUCTS = "GET_PRODUCTS"
const DELETE_PRODUCT = "DELETE_PRODUCT"
const ADD_PRODUCT = "ADD_PRODUCT"

//reducer
const initialState = {
    products: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload
            }
        case DELETE_PRODUCT:
            return {
                ...state,
                products: state.products.filter(e => e.id !== action.payload)
            }
        case ADD_PRODUCT:
            return {
                ...state,
                products: [...state.products, state.payload]
            }
        default:
            return state
    }
}

//actions
export const GetProducts = () => dispatch => {
    axios
        .get('/api/products/')
        .then(res => {
            dispatch({
                type: GET_PRODUCTS,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

export const DeleteProduct = (id) => dispatch => {
    axios
        .delete(`/api/products/${id}/`)
        .then(res => {
            dispatch({
                type: DELETE_PRODUCT,
                payload: id
            })
        })
        .catch(err => console.log(err))
}

export const AddProduct = (product) => dispatch => {
    axios
        .post(`/api/products/`, product)
        .then(res => {
            console.log(res.data);
            dispatch({
                type: ADD_PRODUCT,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}