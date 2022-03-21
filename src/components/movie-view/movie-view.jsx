import React from 'react';
import propTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge'; a

export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Row className="movie-view justify-content-md-center">
        <Col md={8}>
          <Row className="movie-title">
            <h1 className="value">{movie.Title}</h1>
          </Row>
          <Row className="movie-img" >
            <img src={movie.ImagePath} width="350" />
          </Row>

          <Row className="movie-description">
            <div>
              <Badge pill bg="light" text="dark">{movie.Genre.Name}</Badge>
            </div>
            <div>
              <span className="value">{movie.Description}</span>
            </div>
          </Row>
          <Row>
            <Button variant="outline-light" onClick={() => { onBackClick(null); }}>Back to full list</Button>
          </Row>
        </Col>
      </Row>
      // onClick() event listener sets selectedMovie variable in main-view to null, allowing to return back to list of MovieCards
    );
  }

}

/* Use propTypes to validate data types of props
    Validation logic:
    movie object is required, if object contains a title, the Title has to be a string
    onBackClick function is required
*/
MovieView.propTypes = {
  movie: propTypes.shape({
    Title: propTypes.string
  }).isRequired,
  onBackClick: propTypes.func.isRequired
};