import { FETCH_USER_INFOS_SUCCES, REMOVE_USER_INFOS_SUCCES } from '../types';
import { auth } from '../../firebase';

export const fetchUserInfosSuccess = (userInfos) => {
    return {
        type: FETCH_USER_INFOS_SUCCES,
        payload: userInfos
    }
}

export const removeUserInfosSuccess = (userInfos) => {
    return {
        type: REMOVE_USER_INFOS_SUCCES,
        payload: userInfos
    }
}

export const fetchUserInfos = () => {
    return (dispatch) => {
        auth.onAuthStateChanged(userInfos => {
            if (userInfos) {
                    dispatch(fetchUserInfosSuccess(userInfos));
            }
        });
    }
}

export const removeUserInfos = () => {
    return (dispatch) => {
        dispatch(removeUserInfosSuccess());
    }
}