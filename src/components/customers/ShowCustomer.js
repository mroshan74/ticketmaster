import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { startSingleCustomer } from '../../redux/actions/customersAction'
import { connect } from 'react-redux'

export class ShowCustomer extends Component {
  componentDidMount() {
    console.log('CDM-show', this.props)
    this.props.dispatch(startSingleCustomer(this.props.match.params.id))
  }
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
  if (state.customers.array.length === 0) {
    return {
      customer: state.customers.single,
    }
  } else {
    return {
      customer: state.customers.array.find((ele) => ele._id === id),
    }
  }
}

export default connect(mapStateToProps)(ShowCustomer)
