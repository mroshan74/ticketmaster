import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { startGetCustomers, startDeleteCustomer } from '../../redux/actions/customersAction'

class Customers extends Component {
    componentDidMount(){
        if(this.props.customers.length === 0 ){
            this.props.dispatch(startGetCustomers())
        }
    }

    handleRemove = (id) => {
      this.props.dispatch(startDeleteCustomer(id))
    }

    render() {
        return (
          <div>
            <h1>Customers - {this.props.customers.length}</h1>
            <table border='1'>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Actions</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {this.props.customers.map((customer, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td> {customer.name} </td>
                      <td> {customer.email} </td>
                      <td> {customer.mobile} </td>
                      <td> <Link to={`/customer/${customer._id}`}><button>Show</button></Link> </td>
                      <td><button onClick={()=>{this.handleRemove(customer._id)}}>Remove</button> </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <Link to='customer/new'>Add Customer</Link>
          </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log('MSTP-customer',state)
    return{
      customers: state.customers.array
    }
}
export default connect(mapStateToProps)(Customers)
