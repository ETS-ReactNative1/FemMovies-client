/*
 * action types
 */

export const FETCH_MOVIES_REQUEST = 'FETCH_MOVIES_REQUEST';
export const FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS';
export const FETCH_MOVIES_FAILURE = 'FETCH_MOVIES_FAILURE';
export const SET_FILTER = 'SET_FILTER';
export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';
export const UPDATE_USER = 'UPDATE_USER';
export const SET_FAVORITEMOVIES = 'SET_FAVORITEMOVIES';
export const ADD_FAVORITEMOVIE = 'ADD_FAVORITEMOVIE';
export const REMOVE_FAVORITEMOVIE = 'REMOVE_FAVORITEMOVIE';

/* 
 * action creators
 */

// Initalize the movie list with movies
export function fetchMoviesRequest() {
    return {
        type: FETCH_MOVIES_REQUEST
    };
}

export function fetchMoviesSuccess(movies) {
    return {
        type: FETCH_MOVIES_SUCCESS,
        payload: movies
    };
}

export function fetchMoviesFailure(error) {
    return {
        type: FETCH_MOVIES_FAILURE,
        payload: error
    };
}

// Filter movies
export function setFilter(value) {
    return {
        type: SET_FILTER,
        value
    };
}

// Set the user that is logged in
export function fetchUserRequest() {
    return {
        type: FETCH_USER_REQUEST
    };
}

export function fetchUserSuccess(user) {
    return {
        type: FETCH_USER_SUCCESS,
        payload: user
    };
}

export function fetchUserFailure(error) {
    return {
        type: FETCH_USER_FAILURE,
        payload: error
    };
}

// Allow user to update their data
export function updateUser(updatedUser) {
    console.log('Reached the action UPDATE_FAVORITEMOVIES!');
    return {
        type: UPDATE_USER,
        payload: updatedUser
    };
}

// Initalize Favorite Movie List
export function setFavoriteMovies(value) {
    console.log('Reached the action SET_FAVORITEMOVIES!');
    return {
        type: SET_FAVORITEMOVIES,
        value
    };
}

// Allow user to add a movie to Favorite Movie List
export function addFavoriteMovie(value) {
    console.log('Reached the action ADD_FAVORITEMOVIES!');
    return {
        type: ADD_FAVORITEMOVIE,
        value
    };
}

// Allow user to remove a movie from Favorite Movie List
export function removeFavoriteMovie(value) {
    console.log('Reached the action REMOVE_FAVORITEMOVIES!');
    return {
        type: REMOVE_FAVORITEMOVIE,
        value
    };
}