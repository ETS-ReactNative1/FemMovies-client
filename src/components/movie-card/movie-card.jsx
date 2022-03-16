import React from 'react';
import propTypes from 'prop-types';

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;

    return <div className="movie-card" onClick={() => { onMovieClick(movie); }}>{movie.Title}</div>;
    // onClick() event listener will set selectedMovie variable in main-view to this movie, this will render the movie-view
  }
}

/* Use propTypes to validate data types of props
    Validation logic:
    movie object is required, if object contains a title, the Title has to be a string
    onMovieClick function is required
*/
MovieCard.propTypes = {
  movie: propTypes.shape({
    Title: propTypes.string
  }).isRequired,
  onMovieClick: propTypes.func.isRequired
};