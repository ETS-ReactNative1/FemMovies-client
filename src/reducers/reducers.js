import { combineReducers } from "redux";

// Import actions
import { ADD_FAVORITEMOVIE, REMOVE_FAVORITEMOVIE, SET_FAVORITEMOVIES, SET_FILTER, FETCH_MOVIES_FAILURE, FETCH_MOVIES_SUCCESS, FETCH_MOVIES_REQUEST, FETCH_USER_FAILURE, FETCH_USER_REQUEST, FETCH_USER_SUCCESS, UPDATE_USER } from "../actions/actions";

/*
 * reducer functions
 */

function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function movies(state = { loading: false, movies: [], error: '' }, action) {
  switch (action.type) {
    case FETCH_MOVIES_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_MOVIES_SUCCESS:
      return {
        loading: false,
        movies: action.payload,
        error: ''
      };
    case FETCH_MOVIES_FAILURE:
      return {
        loading: false,
        movies: [],
        error: action.payload
      };
    default:
      return state;
  }
}

function user(state = { loading: false, user: null, error: '' }, action) {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_USER_SUCCESS:
      return {
        loading: false,
        user: action.payload,
        error: ''
      };
    case FETCH_USER_FAILURE:
      return {
        loading: false,
        user: null,
        error: action.payload
      };
    case UPDATE_USER:
      console.log('Reached the reducer UPDATE_USER!');
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
}

function favoriteMovies(state = [], action) {
  switch (action.type) {
    case SET_FAVORITEMOVIES:
      console.log('Reached the reducer SET_FAVORITEMOVIES!');
      return action.value;
    case ADD_FAVORITEMOVIE:
      console.log('Reached the reducer ADD_FAVORITEMOVIES!');
      return [
        ...state, action.value
      ]
    case REMOVE_FAVORITEMOVIE:
      console.log('Reached the reducer REMOVE_FAVORITEMOVIES!');
      return state.filter(movie => movie._id != action.value._id);
    default:
      return state;
  }
}

/*
 * combined reducer
 */

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  user,
  favoriteMovies
});

export default moviesApp;