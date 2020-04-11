import React, { Component } from 'react'
import { connect } from 'react-redux'

import { startEditCustomer } from '../../redux/actions/customersAction'


class CustomerEdit extends Component {
  passData = (editData) => {
      const id = this.props.match.params.id
      const redirect = () => {
          return this.props.history.push(`/customer/${id}`)
      }
      this.props.dispatch(startEditCustomer(editData,id,redirect))
  }

  render() {
    return (
      <div>
        <h1>Edit Customer</h1>
        {this.props.single && <EditForm data={this.props.single} passData={this.passData} />}
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  console.log('MSTP-editCustomer', state)
  const id = props.match.params.id
  return {
    single: state.customers.find(ele => ele._id===id)
  }
}

class EditForm extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      mobile: '',
    }
  }
  componentDidMount() {
    const { name, email, mobile } = this.props.data
    this.setState({
      name,
      email,
      mobile
    })
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { name, email, mobile } = this.state
    const editCustomerData = {
      name,
      email,
      mobile
    }
    console.log('editCustomerData', editCustomerData)
    this.props.passData(editCustomerData)
  }
  render() {
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
