import { FETCH_FILMS_DETAILS_SUCCES, FETCH_FILMS_DETAILS_FAIL } from './types';

const initialeState = () => {
    return {
        filmsDetailsFetched: [],
        error: ''
    }
}

const filmsDetailsReducers = (state = initialeState, action) => {
    switch (action.type) {
        case FETCH_FILMS_DETAILS_SUCCES:
            return {
                filmsDetailsFetched: action.payload,
                error: ''
            }
        case FETCH_FILMS_DETAILS_FAIL:
            return {
                filmsDetailsFetched: [],
                error: action.payload
            }
        default:
            return state
    }
}

export default filmsDetailsReducers;