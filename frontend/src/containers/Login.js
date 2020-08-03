import React, { useState } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { Link, Router } from "react-router-dom";
import './Login.css';
import { useHistory } from 'react-router-dom';
import agent from '../agent';
//import userHasLoggedIn from './AuthenticateLogin';

export default function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function validateForm(){
        return username.length > 0 && password.length > 0;
    }
    const history = useHistory();

    async function handleSubmit(event){
        event.preventDefault();
        const res = await agent.Api.login(username, password);
        if (res && res.ok) {
          alert('Login successful! Please update your profile before ordering!')
          history.push('/');
        } else {
          alert('username or password incorrect')
          history.push('/register')
        }
    }

    // function handleClick(event){
    //      event.preventDefault();
    //      history.push('/register');
    // }


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
                
                {/* <p class="text-center"><br></br>Not a member?<Link to='/register'> Register</Link></p> */}

                {/* <Button block bsSize = 'large' type = 'submit'>
                    Click to register
                </Button> */}
                <p class="text-center"><br></br>Not a member?</p>
                <Button type="submit" block bsSize = 'large' onClick={() => history.push('/register')}>
                Click to register
                </Button>
                
            </form>
        </div>
    );
}
