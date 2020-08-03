import React from 'react';
import { HelpBlock, Button, FormGroup, Form } from 'react-bootstrap';
import agent from '../agent';
import { useHistory } from "react-router-dom";

// class Logout extends React.Component {

//    componentWillMount() {
//       agent.Api.logout().then(res => {
//          if (res && res.ok) {
//             alert('you are now logged out.')
//          }
//       });
//       var history = useHistory();
//       history.push('/logout');
//    }

//    render() {
//       return (
//           <div className = 'Logout'>
//               <form>
//                   <Form>
//                   You are now logged out.
//                   </Form>
//               </form>
//           </div>
//       );
//   }

// }

function Logout() {
   var history = useHistory();
   history.push('/');
}

export default Logout