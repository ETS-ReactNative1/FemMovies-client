import React from 'react';
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      // Creating an empty array to hold movie data from database
      movies: [],
      // Set selectedMovie to null in the beginning, will be used to open MovieView component
      selectedMovie: null
    };
  }

  // Query femmovies API /movies endpoint to set movies state
  componentDidMount() {
    axios.get('https://femmovies.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  // Create function to set the state of selectedMovie to the newSelectedMovie passed in onMovieClick and onBackClick props
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;

    // If movie list is empty (while movies load from API), display empty page
    if (movies.length === 0) return <div className="main-view" />;

    // Else, logic to display the main-view: 
    // If no movie is selected (selecteMovie = null), display a MovieCard for each movie in the list
    // If a movie is selected (via setSelectedMovie, clicking on the MovieCard), display MovieView for this movie
    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} /> // onBackClick prop is used in movie-view <button> element as function passed to onClick() event listener
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie) }} /> // onMovieClick prop is used in movie-card <div> element as function passed to onClick() event listener
          ))
        }
      </div>
    );
  }
}

export default MainView;