import { combineReducers } from 'redux';
import products from './products';
import auth from './auth';
import sales from './sales'

export default combineReducers({
    products,
    auth,
    sales,
});