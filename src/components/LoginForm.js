import React from 'react'

class LoginForm extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            buttonDisabled: false
        }
    }

    handleSubmit(username, password) {
        if (this.props.login) {
            // handle login
        } else {
            // handle registration
        }
    }

    resetForm(){
        this.setState({
            username: '',
            password: '',
            buttonDisabled: false
        })
    }
    
    render(){
        const username = this.state.username ? this.state.username : ''
        const password = this.state.password ? this.state.password : ''
        return (
            <div className="loginForm">
                Log in:
                <form onSubmit={this.handleSubmit(username, password)}>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="username"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => {this.setState({username:e.target.value})}} />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => {this.setState({password:e.target.value})}} />
                  </fieldset>

                  <button
                    className="btn"
                    type="submit"
                    onChange={e => {this.login = true}}>
                    Login
                  </button>

                  <button
                    className="btn"
                    type="submit"
                    onChange={e => {this.login = false}}>
                    Not a client? Register
                  </button>

                </fieldset>
                </form>
            </div>
        );
    }
}

export default LoginForm
