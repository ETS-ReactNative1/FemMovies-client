import React from 'react';
import ReactDOM from 'react-dom';
import MainView from './components/main-view/main-view';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

// Import statement to indicate that './index.scss' should be bundled
import './index.scss';

// Main component
class FemMoviesApplication extends React.Component {
  render() {
    return (
      <>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#">FemMovies</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#">Home</Nav.Link>
              <Nav.Link href="#">Profile</Nav.Link>
              <Nav.Link href="#">Logout</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <Container className="main-container">
          <MainView />
        </Container>

      </>



    );
  }
}

// Find root of app
const container = document.getElementsByClassName('app-container')[0];

// Render app in root DOM element
ReactDOM.render(React.createElement(FemMoviesApplication), container);