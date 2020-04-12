import React, { Component , Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class tickShow extends Component {
    render() {
        const {ticket , emps , depts , customers} = this.props
        return (
            <div>{this.props.ticket &&
                <Fragment>
                    <h2>code : {ticket.code}</h2>
                    <p>Customer - {customers.length > 0 && customers.find(ele => ele._id===ticket.customer).name} </p>
                    <p>Employees - {emps.length > 0 && ticket.employees.map((emp,i) => {
                        return <li key={i}>{emps.find(ele => ele._id===emp._id).name}</li>
                    })} </p>
                    <p>Department - {depts.length > 0 && depts.find(ele => ele._id===ticket.department).name} </p>
                    <p>Message - {ticket.message} </p>
                    <p>Priority - {ticket.priority} </p>
                    <Link to ={`/ticket/edit/${this.props.match.params.id}`}>Edit</Link>
                </Fragment>
            }</div>
        )
    }
}

const mapStateToProps = (state,props) => {
    const id = props.match.params.id
    return {
        depts: state.depts,
        emps: state.emps,
        ticket:state.tickets.find(ticket => ticket._id===id),
        customers: state.customers
    }
}

export default connect(mapStateToProps)(tickShow)
