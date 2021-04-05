import { FETCH_PRODUCTS_IN_CART_SUCCES } from '../types';
import { auth, firebase } from '../../firebase';

export const fetchProductsSuccess = (productsInCart) => {
    return {
        type: FETCH_PRODUCTS_IN_CART_SUCCES,
        payload: productsInCart
    }
}
export const fetchProductsInCart = () => {
    return (dispatch) => {
        const db = firebase.firestore();
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                await db.collection('users').doc(user.uid).onSnapshot(snapshot => {
                    const productsInCart = snapshot.data()?.products;
                    dispatch(fetchProductsSuccess(productsInCart));
                })
            }
        });
    }
}


