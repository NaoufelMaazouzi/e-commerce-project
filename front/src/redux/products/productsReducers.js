import { FETCH_PRODUCTS_SUCCES, FETCH_PRODUCTS_FAIL } from '../types';


const initialeState = () => {
    return {
        productsFetched: [],
        error: '',
    }
}

const fetchProductsReducers = (state = initialeState, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS_SUCCES:
            return {
                productsFetched: action.payload,
                error: '',
            }
        case FETCH_PRODUCTS_FAIL:
            return {
                productsFetched: [],
                error: action.payload,
            }
        default:
            return state
    }
}

export default fetchProductsReducers;