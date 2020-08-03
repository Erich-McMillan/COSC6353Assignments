import React from 'react';
import { HelpBlock, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { useFormFields } from "../libs/hooksLib";
import agent from '../agent';

class FuelQuoteForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            fullname: "",
            address1: "",
            city1: "",
            state1: "",
            zipcode1: "",
            address2: "",
            city2: "",
            state2: "",
            zipcode2: ""
        };
        this.handleSubmit=this.handleSubmit.bind(this)
    }

    componentWillMount() {
        agent.Api.get_profile().then(res => {
            if (res && res.ok) {
               var obj = JSON.parse(res.text)
               this.setState({
                  username: obj['username'],
                  fullname: obj['fullname'],
                  address1: obj['address1']['address'],
                  city1: obj['address1']['city'],
                  state1: obj['address1']['state'],
                  zipcode1: obj['address1']['zipcode'],
                  address2: obj['address2']['address'],
                  city2: obj['address2']['city'],
                  state2: obj['address2']['state'],
                  zipcode2: obj['address2']['zipcode'],
               });
            }
        });
    }

    validateForm() {
        return this.state.address1.length > 0 && this.state.city1.length > 0 && this.state.zipcode1.length > 0 && this.state.zipcode1.length < 9 && this.state.address2.length > 0 && this.state.city2.length > 0 && this.state.zipcode2.length > 0 && this.state.zipcode2.length < 9 && this.state.state1.length === 2 && this.state.state2.length === 2;
    }

    handleSubmit (event) {
        event.preventDefault();
        /*Link with Quote History and DB */
        var obj = {
               fullname : this.state.fullname,
               address1 : {
                  address: this.state.address1,
                  city: this.state.city1,
                  state: this.state.state1,
                  zipcode: this.state.zipcode1
               },
               address2 : {
                  address: this.state.address2,
                  city: this.state.city2,
                  state: this.state.state2,
                  zipcode: this.state.zipcode2
               }
            }
        agent.Api.save_profile(obj).then(res => {
            if (res && res.ok) {
                alert('Profile updated successfully')
            } else {
                alert('Could not update profile')
            }
        });
    }

    render() {
        return (
            <div className = 'FuelQuouteForm'>
                <form onSubmit = {this.handleSubmit}>
                    <FormGroup controlID='username' bsSize='large'>
                        <ControlLabel>Username</ControlLabel>
                        <FormControl
                        autofocus
                        value = {this.state.username}
                        ></FormControl>
                    </FormGroup>
                    <FormGroup controlID='fullname' bsSize='large'>
                        <ControlLabel>Full Name</ControlLabel>
                        <FormControl
                        autofocus
                        value = {this.state.fullname}
                        onChange = {e => this.setState({fullname: e.target.value})}
                        ></FormControl>
                    </FormGroup>
                    <FormGroup controlID='addr1' bsSize='large'>
                        <ControlLabel>Primary Address</ControlLabel>
                        <FormControl
                        value = {this.state.address1}
                        onChange = {e => this.setState({address1: e.target.value})}
                        ></FormControl>
                    </FormGroup>
                    <FormGroup controlID='city1' bsSize='large'>
                        <ControlLabel>City</ControlLabel>
                        <FormControl
                        value = {this.state.city1}
                        onChange = {e => this.setState({city1: e.target.value})}
                        ></FormControl>
                    </FormGroup>
                    <FormGroup controlID='state1' bsSize='large'>
                        <ControlLabel>State</ControlLabel>
                        <FormControl
                        value = {this.state.state1}
                        onChange = {e => this.setState({state1: e.target.value})}
                        ></FormControl>
                    </FormGroup>
                    <FormGroup controlID='zipcode1' bsSize='large'>
                        <ControlLabel>Zipcode</ControlLabel>
                        <FormControl
                        value = {this.state.zipcode1}
                        onChange = {e => this.setState({zipcode1: e.target.value})}
                        ></FormControl>
                    </FormGroup>
                    <FormGroup controlID='addr2' bsSize='large'>
                        <ControlLabel>Secondary Address</ControlLabel>
                        <FormControl
                        value = {this.state.address2}
                        onChange = {e => this.setState({address2: e.target.value})}
                        ></FormControl>
                    </FormGroup>
                    <FormGroup controlID='city2' bsSize='large'>
                        <ControlLabel>City</ControlLabel>
                        <FormControl
                        value = {this.state.city2}
                        onChange = {e => this.setState({city2: e.target.value})}
                        ></FormControl>
                    </FormGroup>
                    <FormGroup controlID='state1' bsSize='large'>
                        <ControlLabel>State</ControlLabel>
                        <FormControl
                        value = {this.state.state2}
                        onChange = {e => this.setState({state2: e.target.value})}
                        ></FormControl>
                    </FormGroup>
                    <FormGroup controlID='zipcode2' bsSize='large'>
                        <ControlLabel>Zipcode</ControlLabel>
                        <FormControl
                        value = {this.state.zipcode2}
                        onChange = {e => this.setState({zipcode2: e.target.value})}
                        ></FormControl>
                    </FormGroup>
                    <Button block bsSize="large" disabled={!this.validateForm()} type="submit">
                        Update Profile
                    </Button>
                </form>
            </div>
        );
    }

}

export default FuelQuoteForm