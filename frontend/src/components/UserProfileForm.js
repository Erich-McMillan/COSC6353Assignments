import React from 'react'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

// Will be moved to lower layer later
const options = [
   'one', 'two', 'three'
 ];
const States = ['AZ', 'TX', 'NY']

function validateZipCode(zipcode) {
   return (zipcode.length < 5)
}

class UserProfileForm extends React.Component {
   
   defaultState = {
      fullname: '',
      addr1: '',
      addr2: '',
      city: '',
      zipcode: '',
      state: '',
      currentOptions:null,
      canSubmit: false
   }

   constructor(props) {
      super(props)
      this.state = this.defaultState
   }

   setInputValue(property, val){
      this.setState({
          [property]: val
      })
   }

   validateInputs() {
      if (this.state.fullname.length > 0
         && this.state.addr1.length > 0
         && this.state.city.length > 0
         && this.state.zipcode.length >= 5
         && this.state.state.length >= 2) {
         return true;
      }
      return false;
   }

   updateProfile() {
      alert('Sucessfully updated user profile')
   }

   resetForm(){
      this.state = this.defaultState
   }

   render() {
      const defaultOption = this.state.state ? this.state.state : States[0]
      const zipcodeError = validateZipCode(this.state.zipcode);
      return (
         <div className="loginForm">
            Update Profile:
            <form onSubmit={(e) => {this.updateProfile(); e.preventDefault(); }}>
            <fieldset>
            <input
               type='text'
               placeholder='Full Name'
               maxLength={50}
               value={this.state.fullname ? this.state.fullname: ''}
               onChange={(e) => {this.setState({fullname:e.target.value})}}
            />
            </fieldset>

            <fieldset>
            <input
               type='text'
               placeholder='Primary Address'
               maxLength={100}
               value={this.state.addr1}
               onChange={(e) => {this.setState({addr1:e.target.value})}}
            />
            </fieldset>

            <fieldset>
            <input
               type='text'
               placeholder='Secondary Address'
               maxLength={100}
               value={this.state.addr2 ? this.state.addr2: ''}
               onChange={(e) => {this.setState({addr2:e.target.value})}}
            />
            </fieldset>

            <fieldset>
            <input
               type='text'
               placeholder='City'
               maxLength={100}
               value={this.state.city ? this.state.city: ''}
               onChange={(e) => {this.setState({city:e.target.value})}}
            />
            </fieldset>

            <fieldset>
            <input
               className={zipcodeError ? "error" : ""}
               type='text'
               placeholder='Zipcode'
               maxLength={9}
               value={this.state.zipcode ? this.state.zipcode: ''}
               onChange={(e) => {this.setState({zipcode:e.target.value})}}
            />
            </fieldset>

            <fieldset>
            <Dropdown 
               options={States}
               // onChange={this._onSelect}
               onChange={(val) => {this.setState({state:val.value}); this.setState({currentOptions:val});}}
               value={defaultOption}
               placeholder="Select an option" />
            </fieldset>

            <fieldset>
            <button
               className="btn"
               type="submit"
               disabled={!this.validateInputs()}>
               Update Profile
            </button>
            </fieldset>
            </form>
         </div>
     );
   }
}

export default UserProfileForm
