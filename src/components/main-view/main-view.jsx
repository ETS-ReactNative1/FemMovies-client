import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

/* import actions */
import { setMovies, setUser, setFavoriteMovies } from '../../actions/actions';

/* import views */
import { Navbar } from '../navbar/navbar';
import { LoginView } from '../login-view/login-view';
import MoviesList from '../movies-list/movies-list';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import ProfileView from '../profile-view/profile-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';

/* import bootstrap components */
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



class MainView extends React.Component {

  constructor() {
    super();
  }

  // When token is present (user is logged in), get list of movies
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    let username = localStorage.getItem('user');
    console.log('componentDidMount() is running!');

    if (accessToken !== null && username !== null) {

      this.getMovies(accessToken);
      this.getUser(accessToken, username);
      this.getFavoriteMovies(accessToken, username);

    }

  }

  /**
   * queries the movie api to set movies state with the list of all movies
   * @param {string} token 
   */
  getMovies(token) {
    axios.get('https://femmovies.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        //Assign the result to the movies state using action creator
        this.props.setMovies(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }


  /**
   * queries the movie api to set user state with the currently logged in user
   * @param {string} token 
   * @param {string} username 
   */
  getUser(token, username) {
    axios.get(`https://femmovies.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        //Assign the result to the userdata
        this.props.setUser(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  /**
   * queries the movie api to set the favorite movies with the list of the currently logged in user
   * @param {string} token 
   * @param {string} username 
   */
  getFavoriteMovies(token, username) {
    axios.get(`https://femmovies.herokuapp.com/users/${username}/movies`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        //Assign the result to the userdata
        this.props.setFavoriteMovies(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  /**
   * On successful user login: sets local storage, and calls the API query functions to se the states for movies, user, and favorite Movies 
   * @param {*} authData 
   */
  onLoggedIn(authData) {
    // Set local storage
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    console.log('onLoggedIn() is running!');

    // Make API calls to set states
    this.getMovies(authData.token);
    this.getUser(authData.token, authData.user.Username);
    this.getFavoriteMovies(authData.token, authData.user.Username);

  }



  render() {
    let { movies, user, favoriteMovies } = this.props;
    console.log('List of favoriteMovies:');
    console.log(favoriteMovies);


    return (
      <Router>
        < Navbar user={user} />
        <Container>

          <Row className="main-view justify-content-md-center">

            <Route exact path="/" render={() => {
              /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
              if (!user) return (
                <Col md={6}>
                  <LoginView onLoggedIn={authData => this.onLoggedIn(authData)} />
                </Col>
              )

              // If movie list is empty (while movies load from API), display empty page
              if (movies.length === 0) return <div className="main-view" />;

              return (
                <MoviesList movies={movies} user={user} favoriteMovies={favoriteMovies} />
              )
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
            <Route path={`/users/:username`} render={({ history }) => {
              if (!user) return <Redirect to="/" />
              return (
                <Col xs={12} md={10}>
                  <ProfileView user={user} favoriteMovies={favoriteMovies} onBackClick={() => history.goBack()} />
                </Col>
              )
            }} />
            <Route path={"/directors/:name"} render={({ match, history }) => {
              if (!user) return <Redirect to="/" />
              // If movie list is empty (while movies load from API), display empty page
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col xs={12} md={10}>
                  <DirectorView movies={movies} user={user} favoriteMovies={favoriteMovies} director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
                </Col>
              )
            }} />
            <Route path={"/genres/:name"} render={({ match, history }) => {
              if (!user) return <Redirect to="/" />
              // If movie list is empty (while movies load from API), display empty page
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col xs={12} md={10}>
                  <GenreView movies={movies} user={user} favoriteMovies={favoriteMovies} genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
                </Col>
              )
            }} />


          </Row>
        </Container>
      </Router>

    );
  }
}

let mapStateToProps = state => {
  return {
    movies: state.movies,
    user: state.user,
    favoriteMovies: state.favoriteMovies
  }
}

export default connect(mapStateToProps, { setMovies, setUser, setFavoriteMovies })(MainView);