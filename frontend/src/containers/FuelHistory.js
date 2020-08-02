import React from 'react';
import {Table} from 'react-bootstrap';
import agent from '../agent';
import './FuelHistory.css';

function TrimNum (num){
    var number = parseFloat(num);
    var n = number.toFixed(2);
    return n.toString();
}

class FuelHistory extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            quotes: []
        };
    }

    componentDidMount() {
        agent.Api.get_quotes().then(res => {
            if (res && res.ok) {
                var rawQuotes = JSON.parse(res.text)
                var quoteArray = []
                rawQuotes.forEach(
                    e => {
                        var quote = {
                            'price_per_gallon': e['price_per_gallon'],
                            'gallons_requested': e['gallons_requested'],
                            'delivery_date': e['delivery_date'],
                            'delivery_addr': e['delivery_addr']['address'] + ', ' + e['delivery_addr']['city'] + ', ' + e['delivery_addr']['state'] + ', ' + e['delivery_addr']['zipcode'],
                            'total_cost': TrimNum(e['total_cost'])
                        }
                        quoteArray.push(quote)
                    }
                )
                this.setState({quotes: quoteArray});
            }
        });
    }
 
    render() {
        return (
            <div className = 'FuelHistory'>
                <Table bordered align='center'>
                    <thead>
                        <tr>
                            <th>Delivery Address</th>
                            <th>Date</th>
                            <th>Gallons Purchased</th>
                            <th>Price per gallon</th>
                            <th>Total Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.quotes.map((order) => 
                        (
                            <tr>
                                <td>{order['delivery_addr']}</td>
                                <td>{order['delivery_date']}</td>
                                <td>{order['gallons_requested']}</td>
                                <td>{order['price_per_gallon']}</td>
                                <td>{order['total_cost']}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        );
    }    
}

export default FuelHistory;
