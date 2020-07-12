import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { HelpBlock, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Register.css";

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    /*const history = useHistory();*/

    function validateForm() {
        return (
          username.lenght > 0 && password.lenght > 0 &&
          password === confirmPassword
        );
    }

    function handleSubmit (event){
        event.preventDefault();
        {/*Set up registration through try and catch blocks. Then push to homepage */}
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