import axios from 'axios'
import { tokenConfig } from './auth'

// types
const GET_SALES = "GET_SALES"
const ADD_SALES = "ADD_SALES"
// const DELETE_PRODUCT = "DELETE_PRODUCT"
// const ADD_PRODUCT = "ADD_PRODUCT"

//reducer
const initialState = {
    sales: [],
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_SALES:
            return {
                ...state,
                sales: action.payload
            }
        case ADD_SALES:
            return {
                ...state,
                sales: [ ...state.sale, action.payload]
            }
        default:
            return state
    }
}

//actions
export const GetSales = () => (dispatch, getState) => {
    axios
        .get('/api/sales/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_SALES,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

export const AddSale = (sale) => (dispatch, getState) => {
    axios
        .post(`/api/sales/`, sale, tokenConfig(getState))
        .then(res => {
            console.log(res.data);
            dispatch({
                type: ADD_SALES,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}