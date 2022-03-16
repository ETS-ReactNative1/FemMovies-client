import React, { useState } from 'react';

// Create RegistrationView as function component using Hooks
export function RegistrationView(props) {
  // Call useState method from React to initialize registration variables with an empty value
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  // Sending request to server for authentication
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent default submit button behaviour, i.e., don't reload the page
    console.log(username, password, email, birthday);

    /* Send a request to the server for authentication */
    /* then call this.props.onLoggedIn(username) */
    //props.onLoggedIn(username);
  }

  // Return a registration form where users can submit their username, password, email and birthday
  // Listening to changes on input and then updating the respective states

  return (
    <form>
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <label>
        Birthday:
        <input type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
      </label>
      <button type="submit" onClick={handleSubmit}>Submit</button>
    </form>
  );

}