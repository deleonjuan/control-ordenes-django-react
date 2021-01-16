import axios from 'axios'
import { tokenConfig } from './auth'

// types
const GET_PRODUCTS = "GET_PRODUCTS"
const GET_PRODUCTS_ANNONIMOUS = "GET_PRODUCTS_ANNONIMOUS"
const DELETE_PRODUCT = "DELETE_PRODUCT"
const ADD_PRODUCT = "ADD_PRODUCT"

//reducer
const initialState = {
    products: [],
    myproducts: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                myproducts: action.payload
            }
        case GET_PRODUCTS_ANNONIMOUS:
            return {
                ...state,
                products: action.payload
            }
        case DELETE_PRODUCT:
            return {
                ...state,
                myproducts: state.myproducts.filter(e => e.id !== action.payload)
            }
        case ADD_PRODUCT:
            return {
                ...state,
                myproducts: [...state.myproducts, state.payload]
            }
        default:
            return state
    }
}

//actions
export const GetProducts = () => (dispatch, getState) => {
    axios
        .get('/api/products/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_PRODUCTS,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

export const DeleteProduct = (id) => (dispatch, getState) => {
    axios
        .delete(`/api/products/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: DELETE_PRODUCT,
                payload: id
            })
        })
        .catch(err => console.log(err))
}

export const AddProduct = (product) => (dispatch, getState) => {
    axios
        .post(`/api/products/`, product, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: ADD_PRODUCT,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

export const UpdateProduct = (product, id) => (dispatch, getState) => {
    axios
        .put(`api/products/${id}/`, product, tokenConfig(getState))
        .then(res => {
            window.location.reload()
        })
        .catch(err => console.log(err))
}

export const GetProductsAnnonimous = () => (dispatch) => {

    axios
        .get('/api/allproducts')
        .then(res => {
            dispatch({
                type: GET_PRODUCTS_ANNONIMOUS,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}