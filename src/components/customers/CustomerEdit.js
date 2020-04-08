import React, { Component } from 'react'
import { connect } from 'react-redux'

import { startEditCustomer, startSingleCustomer } from '../../redux/actions/customersAction'


class CustomerEdit extends Component {
  componentDidMount(){
    console.log('CDM-edit',this.props)
    if(Object.keys(this.props.single).length === 0){
        this.props.dispatch(startSingleCustomer(`${this.props.match.params.id}`))
    }
  }

  passData = (editData) => {
      const id = this.props.match.params.id
      const redirect = () => {
          return this.props.history.push(`/customers/${id}`)
      }
      this.props.dispatch(startEditCustomer(editData,id,redirect))
  }

  render() {
    return (
      <div>
        <h1>Edit Customer</h1>
        <EditForm data={this.props.single} passData={this.passData} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('MSTP-editCustomer', state)
  return {
    single: state.customers.single,
  }
}

class EditForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name:'',
      email:'',
      mobile:'',
    }
  }
  
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { name, email, mobile } = this.state
    const editCustomerData = {
      name: name,
      email: email,
      mobile: mobile,
    }
    console.log('editCustomerData', editCustomerData)
    this.props.passData(editCustomerData)
  }
  render() {
    console.log('render-inside',this.props)
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
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

export default connect(mapStateToProps)(CustomerEdit)
