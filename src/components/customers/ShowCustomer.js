import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { startSingleCustomer } from '../../redux/actions/customersAction'
import { connect } from 'react-redux'

export class ShowCustomer extends Component {
    componentDidMount(){
        console.log('CDM-show',this.props)
        this.props.dispatch(startSingleCustomer(this.props.match.params.id))
    }
    render() {
        return (
            <div>
                <h2>{this.props.customer.name} - {this.props.customer.email}</h2>
                <Link to={`/customer/edit/${this.props.match.params.id}`}>Edit</Link>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log('MSTP-showCustomer',state)
    return{
        customer: state.customers.single
    }
}

export default connect(mapStateToProps)(ShowCustomer)
