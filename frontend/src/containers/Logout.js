import React from 'react';
import { HelpBlock, Button, FormGroup, Form } from 'react-bootstrap';
import agent from '../agent';

class Logout extends React.Component {

   componentWillMount() {
      agent.Api.logout().then(res => {
         if (res && res.ok) {
            return (
               <FormGroup controlID='username' bsSize='large'>
                  value = 'You are now logged out.'
               </FormGroup>
            );
         }
      });
   }

   render() {
      return (
          <div className = 'Logout'>
              <form>
                  <Form>
                  You are now logged out.
                  </Form>
              </form>
          </div>
      );
  }

}

export default Logout