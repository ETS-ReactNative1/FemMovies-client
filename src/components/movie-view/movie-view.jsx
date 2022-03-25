import React from 'react';
import propTypes from 'prop-types';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Row className="movie-view justify-content-md-center">
        <Col>
          <div className="movie-title">
            <h1 className="display-4">{movie.Title}</h1>
          </div>
          <div className="movie-img text-center" >
            <img src={movie.ImagePath} width="350" className="img-fluid" />
          </div>

          <div className="movie-description">
            <div>
              <Badge pill bg="light" text="dark">{movie.Genre.Name}</Badge>
            </div>
            <div>
              <span className="value">{movie.Description}</span>
            </div>
          </div>
          <div>
            <Button variant="outline-light" onClick={() => { onBackClick() }}>Back to full list</Button>
          </div>
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