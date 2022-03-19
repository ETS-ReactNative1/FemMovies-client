import React from 'react';
import ReactDOM from 'react-dom';
import MainView from './components/main-view/main-view';
import Container from 'react-bootstrap/Container';

// Import statement to indicate that './index.scss' should be bundled
import './index.scss';

// Main component
class FemMoviesApplication extends React.Component {
  render() {
    return (
      <Container>
        <MainView />
      </Container>
    );
  }
}

// Find root of app
const container = document.getElementsByClassName('app-container')[0];

// Render app in root DOM element
ReactDOM.render(React.createElement(FemMoviesApplication), container);