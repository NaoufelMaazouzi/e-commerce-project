import { FETCH_FILMS_DETAILS_SUCCES, FETCH_FILMS_DETAILS_FAIL } from './types';
import Axios from 'axios';

export const fetchFilmsDetailsSuccess = (details) => {
    return {
        type: FETCH_FILMS_DETAILS_SUCCES,
        payload: details
    }
}

export const fetchFilmsDetailsFail = (error) => {
    return {
        type: FETCH_FILMS_DETAILS_FAIL,
        payload: error
    }
}

export const fetchFilmsDetails = (params) => {
    return (dispatch) => {
        Axios.get(`https://api.themoviedb.org/3/movie/${params}?api_key=c0f2b3829e285f40ea8719b23184af1b&language=fr`)
            .then(response => {
                const detailsFilmData = response.data;
                dispatch(fetchFilmsDetailsSuccess(detailsFilmData));
            })
            .catch(error => {
                const errorMsgFilmDetails = error.message;
                dispatch(fetchFilmsDetailsFail(errorMsgFilmDetails));
            })
    }
}
