import { FETCH_PRODUCTS_SUCCES, FETCH_PRODUCTS_FAIL } from '../types';
import Axios from 'axios';

export const fetchProductsSuccess = (products) => {
    return {
        type: FETCH_PRODUCTS_SUCCES,
        payload: products
    }
}

const fetchProductsFail = (error) => {
    return {
        type: FETCH_PRODUCTS_FAIL,
        payload: error
    }
}

export const fetchProducts = () => {
    return (dispatch) => {
        Axios.get(`http://localhost:5000/api/products`)
            .then(response => {
                const products = response.data;
                dispatch(fetchProductsSuccess(products));
            })
            .catch(error => {
                const errorMsg = error.message;
                dispatch(fetchProductsFail(errorMsg));
            })
    }
}


