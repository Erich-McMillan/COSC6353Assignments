import React, { useState } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import './Login.css';
import { useHistory } from 'react-router-dom';

export default function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function validateForm(){
        return username.length > 0 && password.length > 0;
    }

    function handleSubmit(event){   /*Handle login and Registration, add login and logout sessions as per DB and Backend*/
        event.preventDefault();
        /*
        try{
            await validateForm() ; {handle login}
            history.push('/');  
        } catch (e) {
            alert('Login failed');
        }
        */
    }

    /*const history = useHistory();*/

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
