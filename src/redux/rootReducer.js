import { combineReducers } from 'redux';
import productsReducers from './products/productsReducers';

const rootReducer = combineReducers({
    products: productsReducers,
})

export default rootReducer;