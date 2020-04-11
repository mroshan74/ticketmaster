import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

export class ShowCustomer extends Component {
  render() {
    return (
      <div>
        {this.props.customer &&
        <h2>
          {this.props.customer.name} - {this.props.customer.email}
        </h2>}
        <Link to={`/customer/edit/${this.props.match.params.id}`}>Edit</Link>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  const id = props.match.params.id
  console.log('MSTP-showCustomer', state)
  return {
      customer: state.customers.find((ele) => ele._id === id),
  }
}

export default connect(mapStateToProps)(ShowCustomer)
