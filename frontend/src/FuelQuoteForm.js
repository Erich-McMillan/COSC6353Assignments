import React from 'react';
import { HelpBlock, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { useFormFields } from "../libs/hooksLib";
import agent from '../agent';

function TrimNum (num){
    var number = parseFloat(num);
    var n = number.toFixed(2);
    return n.toString();
}

class FuelQuoteForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: "",
            city: "",
            state: "",
            zipcode: "",
            gallons: "",
            date: "",
            price: "",
            deliveryQuote: ""
        };
        this.handleSubmit=this.handleSubmit.bind(this)
    }

    componentWillMount() {
        agent.Api.get_profile().then(res => {
            if (res && res.ok) {
                // alert(res.body['address 1']['city'])
               var obj = JSON.parse(res.text)
                this.setState({
                    address: obj['address1']['address'],
                    city: obj['address1']['city'],
                    state: obj['address1']['state'],
                    zipcode: obj['address1']['zipcode'],
                    gallons: "",
                    date: "",
                    price: "",
                    deliveryQuote: "0.00"
                });
            }
        });
    }

    validateForm() {
        return this.state.address.length > 0 && this.state.city.length > 0 && this.state.zipcode.length > 0 && this.state.zipcode.length < 9 && this.state.gallons != 0;
    }

    handleSubmit (event) {
        event.preventDefault();
        /*Link with Quote History and DB */
        var obj = {
            delivery_addr : {
                address: this.state.address,
                city : this.state.city,
                state : this.state.state,
                zipcode : this.state.zipcode,
            },
            gallons_requested : this.state.gallons,
            delivery_date : this.state.date,
        }
        agent.Api.get_quote(obj).then(res => {
            if (res && res.ok) {
                var obj = JSON.parse(res.text)
                alert("Total Cost: " + TrimNum(obj['total_cost']))
                this.setState({
                    address: obj['delivery_addr']['address'],
                    city: obj['delivery_addr']['city'],
                    state: obj['delivery_addr']['state'],
                    zipcode: obj['delivery_addr']['zipcode'],
                    gallons: obj['gallons_requested'],
                    date: obj['delivery_date'],
                    price: obj['price_per_gallon'],
                    deliveryQuote: TrimNum(obj['total_cost'])
                });
            } else {
                alert(res)
                alert('res not ok?')
            }
        });
    }

    render() {
        return (
            <div className = 'FuelQuouteForm'>
                <form onSubmit = {this.handleSubmit}>
                    <FormGroup controlID='address' bsSize='large'>
                        <ControlLabel>Delivery Address</ControlLabel>
                        <FormControl
                        autofocus
                        type = 'address'
                        value = {this.state.address}
                        onChange = {val => this.setState({address: val})}
                        ></FormControl>
                    </FormGroup>
                    <FormGroup controlID='city' bsSize='large'>
                        <ControlLabel>City</ControlLabel>
                        <FormControl
                        type = 'city'
                        value = {this.state.city}
                        onChange = {e => this.setState({city: e.target.value})}
                        ></FormControl>
                    </FormGroup>
                    <FormGroup controlID='state' bsSize='large'>
                        <ControlLabel>State</ControlLabel>
                        <FormControl
                        type = 'state'
                        value = {this.state.state}
                        onChange = {e => this.setState({state: e.target.value})}
                        ></FormControl>
                    </FormGroup>
                    <FormGroup controlID='zipcode' bsSize='large'>
                        <ControlLabel>Zipcode</ControlLabel>
                        <FormControl
                        type = 'zipcode'
                        value = {this.state.zipcode}
                        onChange = {e => this.setState({zipcode: e.target.value})}
                        ></FormControl>
                    </FormGroup>
                    <FormGroup controlID='gallons' bsSize='large'>
                        <ControlLabel>Order Gallons</ControlLabel>
                        <FormControl
                        type = 'gallons'
                        value = {this.state.gallons}
                        onChange = {e => this.setState({gallons: e.target.value})}
                        ></FormControl>
                    </FormGroup>
                    <FormGroup controlID='date' bsSize='large'>
                        <ControlLabel>Delivery Date</ControlLabel>
                        <FormControl
                        type = 'date'
                        value = {this.state.date}
                        onChange = {e => this.setState({date: e.target.value})}
                        ></FormControl>
                    </FormGroup>
                    <FormGroup controlID='price' bsSize='large'>
                        <ControlLabel>Suggested Price</ControlLabel>
                        <FormControl
                        type = 'price'
                        value = {this.state.price}
                        ></FormControl>
                    </FormGroup>
                    <FormGroup controlID='deliveryQuote' bsSize='large' read-only>
                        <ControlLabel>Total Amount due</ControlLabel>
                        <FormControl
                        type = 'deliveryQuote'
                        value = {this.state.deliveryQuote}
                        ></FormControl>
                    </FormGroup>
                    <Button block bsSize="large" disabled={!this.validateForm()} type="submit">
                        Get Quote
                    </Button>
                </form>
            </div>
        );
    }

}

export default FuelQuoteForm