import React, { Component , Fragment } from 'react'
import { connect } from 'react-redux'

class StatusCustomer extends Component {
  constructor() {
    super()
    this.state = {
      status: 'all',
    }
  }

  handleChangeStatus = (status) => {
    this.setState({ status })
  }

  render() {
    const { tickets } = this.props
    console.log(this.props)
    return (
      <div>
        <button onClick={() => {this.handleChangeStatus('all')}}>
          All</button>

        <button onClick={() => {this.handleChangeStatus(false)}}>
          Pending</button>

        <button onClick={() => {this.handleChangeStatus(true)}}>
          Completed</button>

        {tickets.map((ticket, i) => {
          return <ShowTick key={i} status={this.state.status} ticket={ticket} {...this.props} />
        })}
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  const id = props.id
  console.log('MSTP-CusStatus', state, 'props-id', id, props)
  return {
    depts: state.depts,
    emps: state.emps,
    tickets: state.tickets.filter((ticket) => ticket.customer === id),
    customers: state.customers
  }
}

function ShowTick(props) {
console.log('********************************',props)
  const { emps, depts, customers, ticket,status } = props
  function View(){
      return(
        <div>
        {ticket && (
            <Fragment>
            <h2>code : {ticket.code}</h2>
            <p>
                Customer :
                {customers.length > 0 &&
                customers.find((ele) => ele._id === ticket.customer).name}
            </p>
            <p>
                Employees -
                {emps.length > 0 &&
                ticket.employees.map((emp, i) => {
                    return (
                    <li key={i}>
                        {emps.find((ele) => ele._id === emp._id).name}
                    </li>
                    )
                })}
            </p>
            <p>
                Department -
                {depts.length > 0 &&
                depts.find((ele) => ele._id === ticket.department).name}
            </p>
            <p>Message - {ticket.message} </p>
            <p>Priority - {ticket.priority} </p>
            </Fragment>
        )}
        </div>
        )
    }
  return (
    <div>
      {status === 'all' ? (<View/>) : (ticket && ticket.isResolved === status && <View/>)}
    </div>
  )
}

export default connect(mapStateToProps)(StatusCustomer)

