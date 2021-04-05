import { FETCH_USER_INFOS_SUCCES, REMOVE_USER_INFOS_SUCCES } from '../types';


const initialeState = () => {
    return {
        userInfosFetched: [],
        error: '',
    }
}

const fetchUserInfosReducers = (state = initialeState, action) => {
    switch (action.type) {
        case FETCH_USER_INFOS_SUCCES:
            return {
                userInfosFetched: action.payload,
                error: '',
            }
        case REMOVE_USER_INFOS_SUCCES:
            return {
                userInfosFetched: action.payload,
                error: '',
            }
        default:
            return state
    }
}

export default fetchUserInfosReducers;