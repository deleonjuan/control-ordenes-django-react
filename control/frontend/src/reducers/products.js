import axios from 'axios'

// types
const GET_PRODUCTS = "GET_PRODUCTS"


//reducer
const initialState = {
    products: []
}

export default function(state = initialState, action) {
    switch(action.type){
        case GET_PRODUCTS:
            return{
                ...state,
                products: action.payload
            }
        default:
            return state
    }
}

//actions
export const GetProducts = () => dispatch => {
    axios.get('/api/products/')
    .then(res => {
        dispatch({
            type: GET_PRODUCTS,
            payload: res.data
        })
    })
    .catch(err => console.log(err))
}