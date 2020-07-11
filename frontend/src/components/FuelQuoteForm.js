import React from 'react'
import Calendar from 'react-calendar'

class FuelQuoteForm extends React.Component {

   constructor(props){
      super(props);
      this.state = {
         gallons: '',
         date: new Date(),
         useraddr: '301 Fannin St. Houston TX, 77002',
         gallons: NaN,
      }
   }

   resetForm() {
      this.setState({
         gallons: '',
         date: new Date(),
         useraddr: '301 Fannin St. Houston TX, 77002',
         gallons: 0,
         pricepergallon: 0,
         totalcost: 0
      })
   }

   getQuote() {
      if (this.state.gallons <= 0) {
         return;
      }
      this.setState({pricepergallon:1})
      this.setState({totalcost:1*this.state.gallons})
      //alert('Gallons requested: ' + this.state.gallons + '\nPrice per gallon: ' + 10 + '\nTotal cost: ' + 100);
   }

   render() {
      return (
         <div className='fuelQuoteForm'>
            Fuel Quote
            <form onSubmit={(e) => {this.getQuote(); e.preventDefault(); }}>
            <fieldset>
            <input
               type='number'
               placeholder='Gallons Requested'
               value = {this.state.gallons}
               onChange={(e) => {this.setState({gallons:e.target.value})}}
            />
            </fieldset>

            <fieldset>
               Delivery Address: {this.state.useraddr}
            </fieldset>

            <fieldset>
               Delivery Date:
            <Calendar>
               onChange={(val) => this.setState({'date':val})}
               value={this.state.date}
            </Calendar>
            </fieldset>

            <button
               className="btn"
               type="submit">
               Get Quote
            </button>

            <fieldset>
               Price per gallon: {this.state.pricepergallon}
            </fieldset>

            <fieldset>
               Total Cost: {this.state.totalcost}
            </fieldset>

            </form>

         </div>
      );
   }
}

export default FuelQuoteForm
