import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';

export function FavoriteMovies(favoriteMovieList) {
    return (
        <>
            <h4>My favorite movies</h4>


            <Row className="justify-content-md-center">
                {favoriteMovieList.map(movies => (
                    <Col xs={12} sm={6} className="d-flex" key={movies._id}>
                        <img variant="top" src={movies.ImagePath} className="img-responsive" />
                        <Link to={`/movies/${movies._id}`}>
                            <h4>{movies.Title}</h4>
                        </Link>
                        <Button variant="outline-primary">Remove from list</Button>
                    </Col>
                ))}
            </Row>

        </>
    )

}