import React from 'react';

export class LoginView extends React.Component {
  constructor(props) {
    super(props);

    // Store username and password in local state
    this.state = {
      username: '',
      password: ''
    };

    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // function to set username state
  onUsernameChange(event) {
    this.setState({
      username: event.target.value
    });
  }

  // function to set password state
  onPasswordChange(event) {
    this.setState({
      password: event.target.value
    });
  }

  // Sending request to server for authentication
  handleSubmit() {
    const { username, password } = this.state;
    console.log(username, password);

    /* Send a request to the server for authentication */
    /* then call this.props.onLoggedIn(username) */
    // this.props.onLoggedIn(username);
  }

  // Render a login form where users can submit their username and password
  // Listening to changes on input and then updating the respective states
  render() {
    return (
      <form>
        <label>
          Username:
          <input type="text" value={this.state.username} onChange={this.onUsernameChange} />
        </label>
        <label>
          Password:
          <input type="password" value={this.state.password} onChange={this.onPasswordChange} />
        </label>
        <button type="button" onClick={this.handeSubmit}>Submit</button>
      </form>
    );
  }
}