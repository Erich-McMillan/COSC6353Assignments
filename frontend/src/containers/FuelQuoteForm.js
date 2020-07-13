import React from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { useFormFields } from "../libs/hooksLib";

export default function FuelQuoteForm (){
    const [fields, handleFieldChange] = useFormFields ({
        address: "10330 Bissonnet St.",
        city: "Houston",
        state: "TX",
        zipcode: "77099",
        gallons: "2000",
        date: "",
        price: "1.5000",
        deliveryQuote: "0.00"
    });

    function validateForm() {
        return fields.address.length > 0 && fields.city.length > 0 && fields.zipcode.length > 0 && fields.zipcode < 9 && fields.gallons != 0 && fields.price != 0;
    }

    function handleSubmit (event) {
        event.preventDefault();
        /*Link with Quote History and DB */
    }

    function getDeliveryQuote(){
        if (fields.gallons <= 0 && !validateForm()){
            return;
        }
        fields.deliveryQuote = (fields.price)*(fields.gallons); 
    }

    return (
        <div className = 'FuelQuouteForm'>
            <form onSubmit = {handleSubmit}>
                <FormGroup controlID='address' bsSize='large'>
                    <ControlLabel>Delivery Address</ControlLabel>
                    <FormControl
                    autofocus
                    type = 'address'
                    value = {fields.address}
                    onChange = {handleFieldChange}
                    ></FormControl>
                </FormGroup>
                <FormGroup controlID='city' bsSize='large'>
                    <ControlLabel>City</ControlLabel>
                    <FormControl
                    type = 'city'
                    value = {fields.city}
                    onChange = {handleFieldChange}
                    ></FormControl>
                </FormGroup>
                <FormGroup controlID='state' bsSize='large'>
                    <ControlLabel>State</ControlLabel>
                    <FormControl
                    type = 'state'
                    value = {fields.state}
                    onChange = {handleFieldChange}
                    ></FormControl>
                </FormGroup>
                <FormGroup controlID='zipcode' bsSize='large'>
                    <ControlLabel>Zipcode</ControlLabel>
                    <FormControl
                    type = 'zipcode'
                    value = {fields.zipcode}
                    onChange = {handleFieldChange}
                    ></FormControl>
                </FormGroup>
                <FormGroup controlID='gallons' bsSize='large'>
                    <ControlLabel>Order Gallons</ControlLabel>
                    <FormControl
                    type = 'gallons'
                    value = {fields.gallons= getDeliveryQuote()}
                    onChange = {handleFieldChange}
                    ></FormControl>
                </FormGroup>
                <FormGroup controlID='date' bsSize='large'>
                    <ControlLabel>Delivery Date</ControlLabel>
                    <FormControl
                    type = 'date'
                    value = {fields.date}
                    onChange = {handleFieldChange}
                    ></FormControl>
                </FormGroup>
                <FormGroup controlID='price' bsSize='large'>
                    <ControlLabel>Suggested Price</ControlLabel>
                    <FormControl
                    type = 'price'
                    value = {fields.price}
                    onChange = {handleFieldChange}
                    ></FormControl>
                </FormGroup>
                <FormGroup controlID='deliveryQuote' bsSize='large' read-only>
                    <ControlLabel>Total Amount due</ControlLabel>
                    <FormControl
                    type = 'deliveryQuote'
                    value = {fields.deliveryQuote}
                    onChange = {handleFieldChange}
                    ></FormControl>
                </FormGroup>

            </form>
        </div>
    );

}