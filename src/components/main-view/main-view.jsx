import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { Navbar } from '../navbar/navbar';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { ProfileView } from '../profile-view/profile-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      // Creating an empty array to hold movie data from database
      movies: [],
      // Set initial user state to null, used for user login --> Default is logged out
      user: null
    };
  }

  // Query femmovies API /movies endpoint to set movies state
  getMovies(token) {
    axios.get('https://femmovies.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        //Assign the result to the state
        this.setState({
          movies: response.data

        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  /* On successful login, set token and user variables of local State & load the movies list (getMovies) */
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  // When token is present (user is logged in), get list of movies
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  render() {
    const { movies, user } = this.state;




    // Else, logic to display the main-view: 
    // If no movie is selected (selecteMovie = null), display a MovieCard for each movie in the list
    // If a movie is selected (via setSelectedMovie, clicking on the MovieCard), display MovieView for this movie
    return (
      <Router>
        < Navbar user={user} />
        <Container>

          <Row className="main-view justify-content-md-center">

            <Route exact path="/" render={() => {
              /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
              if (!user) return (
                <Col md={6}>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
              )

              // If movie list is empty (while movies load from API), display empty page
              if (movies.length === 0) return <div className="main-view" />;

              return movies.map(m => (
                <Col xs={12} sm={6} md={4} lg={3} className="d-flex" key={m._id}>
                  <MovieCard movie={m} />
                </Col>

              ))
            }} />

            <Route path="/register" render={() => {
              if (user) return <Redirect to="/" />
              return (
                <Col xs={12} md={8}>
                  <RegistrationView />
                </Col>
              )
            }} />
            <Route path="/movies/:movieId" render={({ match, history }) => {
              return (
                <Col xs={12} md={10}>
                  <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                </Col>
              )
            }} />
            <Route path={"/users/${user}"} render={({ history }) => {
              if (!user) return <Redirect to="/" />
              return (
                <Col xs={12} md={10}>
                  <ProfileView user={user} movies={movies} onBackClick={() => history.goBack()} />
                </Col>
              )
            }} />
            <Route path={"/directors/:name"} render={({ match, history }) => {
              if (!user) return <Redirect to="/" />
              // If movie list is empty (while movies load from API), display empty page
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col xs={12} md={10}>
                  <DirectorView movies={movies} director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
                </Col>
              )
            }} />
            <Route path={"/genres/:name"} render={({ match, history }) => {
              if (!user) return <Redirect to="/" />
              // If movie list is empty (while movies load from API), display empty page
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col xs={12} md={10}>
                  <GenreView movies={movies} genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
                </Col>
              )
            }} />


          </Row>
        </Container>
      </Router>

    );
  }
}

export default MainView;