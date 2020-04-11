import React, { Component } from 'react'
import { connect } from 'react-redux'

import { startSetNewCustomer } from '../../redux/actions/customersAction'

class CustomerNew extends Component {
    constructor(){
        super()
        this.state = {
            name:'',
            email:'',
            mobile:''
        }
    }
    handleChange = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }

    handleSubmit = (e) =>{
        e.preventDefault()
        const { name , email , mobile } = this.state
        const newCustomerData = {
          name,
          email,
          mobile
        }
        const redirect = () => {
          return (this.props.history.push('/customers'))
        }
        console.log('newCustomerData',newCustomerData)
        this.props.dispatch(startSetNewCustomer(newCustomerData,redirect))
    }
    render() {
        return (
          <div>
            <h1>Add Customer</h1>
            <form onSubmit={this.handleSubmit} >
              <label htmlFor='name'>Name </label>
              <input
                type='text'
                name='name'
                id='name'
                value={this.state.name}
                onChange={this.handleChange}
              />
              <br />
              <br />

              <label htmlFor='email'>Email </label>
              <input
                type='email'
                name='email'
                id='email'
                value={this.state.email}
                onChange={this.handleChange}
              />
              <br />
              <br />

              <label htmlFor='mobile'>Mobile </label>
              <input
                type='mobile'
                name='mobile'
                id='mobile'
                value={this.state.mobile}
                onChange={this.handleChange}
              />
              <br />
              <br />

              <input type='submit' value='Submit' />
              </form>
          </div>
        )
    }
}

const mapStateToProps = (state) =>{
  console.log('MSTP-newCustomer', state)
  return{
    customers: state.customers.array
  }
}

export default connect(mapStateToProps)(CustomerNew)
