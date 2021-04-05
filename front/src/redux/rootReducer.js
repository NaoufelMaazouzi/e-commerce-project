import { combineReducers } from 'redux';
import productsReducers from './products/productsReducers';
import productsInCartReducers from './productsInCart/productsInCartReducers';
import userInfosReducers from './userInfos/userInfosReducers';

const rootReducer = combineReducers({
    products: productsReducers,
    productsInCart: productsInCartReducers,
    userInfos: userInfosReducers
})

export default rootReducer;