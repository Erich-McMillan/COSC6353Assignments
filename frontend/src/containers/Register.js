import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { HelpBlock, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Register.css";
import agent from '../agent';

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    /*const history = useHistory();*/

    function validateForm() {
        // return (
        //   username.length > 0 && password.length > 0 &&
        //   password === confirmPassword
        // );
        // TODO: for some reason password equality check fails. Maybe comparision by reference not equality?
        return (
          username.length > 0 && password.length > 0
        );
    }

    async function handleSubmit (event){
        event.preventDefault();
        const res = await agent.Api.register(username, password);
        if (res && res.ok) {
          alert('registration successful')
          // perform redirect
        } else {
          alert('username already taken')
        }
    }

    function renderForm() {
        return (
          <form onSubmit={handleSubmit}>
            <FormGroup controlId="username" bsSize="large">
              <ControlLabel>Username</ControlLabel>
              <FormControl
                autoFocus
                type="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">
              <ControlLabel>Password</ControlLabel>
              <FormControl
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="confirmPassword" bsSize="large">
              <ControlLabel>Confirm Password</ControlLabel>
              <FormControl
                type="password"
                onChange={e => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
            </FormGroup>
            <Button block bsSize="large" disabled={!validateForm()} type="submit">
              Register
            </Button>
          </form>
        );
      }
    
      return (
        <div className="Register">
          if (newUser == NULL) { renderForm() } 
        </div>
      );
}