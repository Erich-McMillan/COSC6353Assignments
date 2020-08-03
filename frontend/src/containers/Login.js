import React, { useState } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import './Login.css';
import { useHistory } from 'react-router-dom';
import agent from '../agent';

export default function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function validateForm(){
        return username.length > 0 && password.length > 0;
    }
    const history = useHistory();

    async function handleSubmit(event){   /*Handle login and Registration, add login and logout sessions as per DB and Backend*/
        event.preventDefault();
        const res = await agent.Api.login(username, password);
        if (res && res.ok) {
          alert('Login successful! Please update your profile before ordering!')
          // perform redirect to profile page
          history.push('/profile');
        } else {
          alert('username or password incorrect')
        }
    }

    /**/

    return(
        <div className = 'Login'>
            <form onSubmit = {handleSubmit}>
                <FormGroup controlId = 'username' bsSize = 'large'>
                    <ControlLabel>Username</ControlLabel>
                    <FormControl
                    autoFocus
                    type = 'username'
                    value = {username}
                    onChange = {e => setUsername(e.target.value)}
                    ></FormControl>
                </FormGroup>
                
                <FormGroup controlId = 'password' bsSize = 'large'>
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                    value  = {password}
                    onChange = {e => setPassword(e.target.value)}
                    type = 'password'
                    ></FormControl>
                </FormGroup>
                
                <Button block bsSize = 'large' disabled = {!validateForm()} type = 'submit'>
                        Login
                </Button>
            </form>
        </div>
    );
}
