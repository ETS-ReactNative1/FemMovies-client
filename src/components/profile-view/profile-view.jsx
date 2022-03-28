import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function ProfileView(props) {


    const [userdata, setUserdata] = useState('');

    // Set default Authorization for axios requests
    let token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    /* Create function to get the user data from API, assign to userdata variable  */
    const getUserData = (token, cancelToken, username) => {
        axios.get(`https://femmovies.herokuapp.com/users/${username}`, {
            cancelToken: cancelToken
        })
            .then(response => {
                //Assign the result to the userdata
                setUserdata(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    /* Get the user data in useEffect hook */
    useEffect(() => {
        let source = axios.CancelToken.source();


        // Load user data
        if (token !== null) {
            getUserData(token, source.token, props.user);
        } else {
            console.log('Not authorized');
        }

        // Cleanup effect
        return () => {
            source.cancel();
        }
    }, []);

    // Call useState method from React to initialize registration variables with an empty value
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    // Create hook for validation errors
    const [usernameErr, setUsernameErr] = useState('');



    // Create validation function
    const validate = () => {
        let isReq = true;
        console.log('Validating');

        if (username.length < 3) {
            setUsernameErr('Username must be at least 3 characters long');
            isReq = false;
        }
        return isReq;
    }

    // Sending request to server for authentication
    const handleUpdate = (e) => {
        e.preventDefault(); // prevent default submit button behaviour, i.e., don't reload the page

        console.log('Handle Update');
        console.log(userdata);


        // Validate values before passing to API
        //const isReq = validate();
        const isReq = true;

        if (isReq) {

            /* Send a request to the server for authentication */
            /* then call this.props.onLoggedIn(username) */
            axios.put(`https://femmovies.herokuapp.com/users/${userdata.Username}`, {
                Username: username,
                Password: password,
                Email: email,
                Birthday: birthday
            })
                .then(response => {
                    const data = response.data;
                    alert('Profile successfully updated');
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }

    const deleteProfile = (e) => {
        axios.delete(`https://femmovies.herokuapp.com/users/${userdata.Username}`)
            .then(response => {
                alert('Your profile was deleted!');
                localStorage.removeItem('user');
                localStorage.removeItem('token');

                window.open('/', '_self');
            })
            .catch(e => {
                console.log(e);
            });
    }

    // Return a registration form where users can submit their username, password, email and birthday
    // Listening to changes on input and then updating the respective states
    return (
        <>
            <h1>{userdata.Username}</h1>
            <Form className="mb-3">
                <Form.Group controlId="formUsername" className="mb-3">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" defaultValue={userdata.Username} onChange={e => setUsername(e.target.value)} />
                    {usernameErr && <p className="font-italic">{usernameErr}</p>}
                </Form.Group>

                <Form.Group controlId="formPassword" className="mb-3">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" defaultValue={userdata.Password} onChange={e => setPassword(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formEmail" className="mb-3">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" defaultValue={userdata.Email} onChange={e => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formBirthday" className="mb-3">
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control type="date" defaultValue={userdata.Birthday} onChange={e => setBirthday(e.target.value)} />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={handleUpdate}>
                    Update Profile
                </Button>
            </Form>
            <div>
                <Button className="mb-3" variant="danger" type="submit" onClick={deleteProfile}>
                    Delete Profile
                </Button>
            </div>
            <div>
                <Button variant="outline-light" onClick={() => { props.onBackClick() }}>Back to full list</Button>
            </div>
        </>
    );


}