import React from 'react'
import FuelQuoteForm from './FuelQuoteForm';

class FuelQuoteHistoryForm extends React.Component {

   getUserOrderHistory() {
      return [
         {
            'gallons': 10,
            'delivery address': '301 Fannin St. Houston, Texas 77002',
            'order date': '08/05/2020',
            'price per gallon':'2',
            'total cost':'20'
         },
         {
            'gallons': 24,
            'delivery address': '301 Fannin St. Houston, Texas 77002',
            'order date': '05/07/2019',
            'price per gallon':'1',
            'total cost':'24'
         },
         {
            'gallons': 7,
            'delivery address': '301 Fannin St. Houston, Texas 77002',
            'order date': '10/06/2018',
            'price per gallon':'10',
            'total cost':'70'
         }
      ]
   }

   render() {
      return (
         <div>
         Order History
            <table>
               <tr>
                  <th scope="col">Delivery Date</th>
                  <th scope="col">Delivery Address</th>
                  <th scope="col">Gallons</th>
                  <th scope="col">Price Per Gallon</th>
                  <th scope="col">Total Cost</th>
               </tr>
               {this.getUserOrderHistory().map((order) => (
                  <tr>
                     <th scope="row">{order['order date']}</th>
                     <td>{order['delivery address']}</td>
                     <td>{order['gallons']}</td>
                     <td>{order['price per gallon']}</td>
                     <td>{order['total cost']}</td>
                  </tr>
               ))}
            </table>
         </div>
      );
   }
}

export default FuelQuoteHistoryForm
