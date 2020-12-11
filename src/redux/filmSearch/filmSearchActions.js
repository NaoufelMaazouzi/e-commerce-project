import { FETCH_FILMS_SEARCH_SUCCES, FETCH_FILMS_SEARCH_FAIL, FETCH_FILMS_SEARCH_REFRESH } from './types';
import Axios from 'axios';

export const fetchFilmsSearchSuccess = (search) => {
    return {
        type: FETCH_FILMS_SEARCH_SUCCES,
        payload: search
    }
}

export const fetchFilmsSearchFail = (error) => {
    return {
        type: FETCH_FILMS_SEARCH_FAIL,
        payload: error
    }
}

export const fetchFilmsSearchRefresh = () => {
    return {
        type: FETCH_FILMS_SEARCH_REFRESH,
        payload: []
    }
}

export const fetchFilmsSearch = (searchFilm) => {
    return (dispatch) => {
        Axios.get(`https://api.themoviedb.org/3/search/movie?query=${searchFilm}&api_key=c0f2b3829e285f40ea8719b23184af1b&language=fr`)
            .then(response => {
                const filmSearch = response.data;
                dispatch(fetchFilmsSearchSuccess(filmSearch));
            })
            .catch(error => {
                const errorMsgFilmSearch = error.message;
                dispatch(fetchFilmsSearchFail(errorMsgFilmSearch));
            })
    }
}
