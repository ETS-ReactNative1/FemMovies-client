import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardGroup from 'react-bootstrap/CardGroup';


class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      // Creating an empty array to hold movie data from database
      movies: [],
      // Set selectedMovie to null in the beginning, will be used to open MovieView component
      selectedMovie: null,
      // Set initial user state to null, used for user login --> Default is logged out
      user: null
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

  /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` property to that movie*/
  // Create function to set the state of selectedMovie to the newSelectedMovie passed in onMovieClick and onBackClick props
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that particular user*/
  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  render() {
    const { movies, selectedMovie, user } = this.state;

    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
    if (!user) return (
      <Row className="login-view justify-content-md-center">
        <Col md={6}>
          <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
        </Col>
      </Row>
    );

    // If movie list is empty (while movies load from API), display empty page
    if (movies.length === 0) return <div className="main-view" />;

    // Else, logic to display the main-view: 
    // If no movie is selected (selecteMovie = null), display a MovieCard for each movie in the list
    // If a movie is selected (via setSelectedMovie, clicking on the MovieCard), display MovieView for this movie
    return (
      <>
        <Row className="main-view justify-content-md-center">
          {selectedMovie
            ? (
              <Col md={8}>
                <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
              </Col>
            )
            : movies.map(movie => (
              <Col xs={12} md={4}>
                <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
              </Col>
            ))
          }
        </Row>
      </>
    );

  }
}

export default MainView;