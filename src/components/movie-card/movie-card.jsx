import React from 'react';
import propTypes from 'prop-types';

import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;


    return (

      <Card text="dark" border="dark" className="mb-3">
        <Card.Img variant="top" src={movie.ImagePath} className="img-responsive" />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          {/* <Card.Text>{movie.Description}</Card.Text> */}
          <Button variant="outline-primary">Add to Favorites</Button>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="link">More Info</Button>
          </Link>

        </Card.Body>
      </Card>

    );
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
  }).isRequired
};