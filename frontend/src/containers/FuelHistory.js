import React from 'react';
import {Table} from 'react-bootstrap';

class FuelHistory extends React.Component{
    
    getUserOrderHistory() {
        return [
           {
              'delivery address': '301 Fannin St., Houston, TX 77002',
              'date': '08/05/2020',
              'gallons': 10,
              'price per gallon':'2',
              'total cost':'20'
           },
           {
              'delivery address': '301 Fannin St., Houston, TX 77002',
              'date': '05/07/2019',
              'gallons': 24,
              'price per gallon':'1',
              'total cost':'24'
           },
           {
              'delivery address': '301 Fannin St., Houston, TX 77002',
              'date': '10/06/2018',
              'gallons': 7,
              'price per gallon':'10',
              'total cost':'70'
           }
        ]
    }
 
    render(){
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
                        {this.getUserOrderHistory().map((order) => 
                        (
                            <tr>
                                <td>{order['delivery address']}</td>
                                <td>{order['date']}</td>
                                <td>{order['gallons']}</td>
                                <td>{order['price per gallon']}</td>
                                <td>{order['total cost']}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        );
    }    
}

export default FuelHistory;
