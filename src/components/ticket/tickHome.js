import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Chart } from 'react-google-charts'
import { startRemoveTickets, startUpdateTickets } from '../../redux/actions/ticketAction'

class tickHome extends Component {
  percent = () => {
    const {tickets} = this.props
    const completed = tickets.filter((ticket) => ticket.isResolved).length
    const round = Math.ceil((completed/tickets.length)*100)
    return `${round}`
  }
  chartTable = () => {
    const { depts, tickets } = this.props
    const result = depts.map((dept) => {
      let count = tickets.filter((ticket) => ticket.department === dept._id && !ticket.isResolved).length
      return [].concat([`${dept.name}`, count])
    })
    console.log(result)
    return result
  }
  handleRemove = (id) => {
      const confirm = window.confirm('Are you sure?')
      if(confirm){
          this.props.dispatch(startRemoveTickets(id))
      }
  }

  handleStatusComplete = (id,status) =>{
      this.props.dispatch(startUpdateTickets(id,{isResolved: !status}))
  }

  render() {
    const { tickets, customers, depts, emps } = this.props
    return (
      <div>
        <h2>Tickets - {tickets.length}</h2>
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Customer</th>
              <th>Department</th>
              <th>Employee</th>
              <th>Message</th>
              <th>Priority</th>
              <th>Actions</th>
              <th>Remove</th>
              <th>Complete</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, i) => {
              return (
                <tr key={i}>
                  <td>{ticket.code}</td>
                  <td>
                    {customers.length > 0 &&
                      customers.find(
                        (customer) => customer._id === ticket.customer
                      ).name}
                  </td>
                  <td>
                    {depts.length > 0 &&
                      depts.find((dept) => dept._id === ticket.department).name}
                  </td>
                  <td>
                    {emps.length > 0 &&
                      ticket.employees.map((ele, i) => {
                        return (
                          <p key={i}>
                            {emps.find((emp) => emp._id === ele._id).name}
                          </p>
                        )
                      })}
                  </td>
                  <td>{ticket.message}</td>
                  <td>{ticket.priority}</td>
                  <td>
                    <Link to={`/ticket/${ticket._id}`}>
                      <button>Show</button>
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        this.handleRemove(ticket._id)
                      }}
                    >
                      Remove
                    </button>
                  </td>
                  <td>
                    {
                      <input
                        type='checkbox'
                        name='status'
                        id='status'
                        checked={ticket.isResolved}
                        onChange={() => {
                          this.handleStatusComplete(
                            ticket._id,
                            ticket.isResolved
                          )
                        }}
                      />
                    }
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <Link to='/ticket/new'> Add ticket</Link>
        <br />
        <br />
        <p>
          <em>completed tickets: {this.percent()}% </em>
        </p>
        <progress value={this.percent()} max='100' />
        <Chart
          width={'600px'}
          height={'600px'}
          chartType='PieChart'
          loader={<div>Loading Chart</div>}
          data={[
            ['Priorities', 'Count'],
            [
              'High',
              this.props.tickets.filter(
                (ticket) => ticket.priority === 'high' && !ticket.isResolved
              ).length,
            ],
            [
              'Medium',
              this.props.tickets.filter(
                (ticket) => ticket.priority === 'medium' && !ticket.isResolved
              ).length,
            ],
            [
              'Low',
              this.props.tickets.filter(
                (ticket) => ticket.priority === 'low' && !ticket.isResolved
              ).length,
            ],
          ]}
          options={{
            title: 'Ticket Priorities',
            // Just add this option
            pieHole: 0.4,
          }}
        />
        <Chart
          width={'600px'}
          height={'400px'}
          chartType='Bar'
          loader={<div>Loading Chart</div>}
          data={[['Departments', 'Tickets'], ...this.chartTable()]}
          options={{
            // Material design options
            chart: {
              title: 'Tickets by department',
            },
          }}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('MSTP-ticket-home', state)
  return {
    tickets: state.tickets,
    customers: state.customers,
    depts: state.depts,
    emps: state.emps,
  }
}

export default connect(mapStateToProps)(tickHome)
