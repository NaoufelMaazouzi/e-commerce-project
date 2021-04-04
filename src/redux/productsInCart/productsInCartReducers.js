import { FETCH_PRODUCTS_IN_CART_SUCCES } from '../types';


const initialeState = () => {
    return {
        productsInCartFetched: [],
        error: '',
    }
}

const fetchProductsInCartReducers = (state = initialeState, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS_IN_CART_SUCCES:
            return {
                productsInCartFetched: action.payload,
                error: '',
            }
        default:
            return state
    }
}

export default fetchProductsInCartReducers;