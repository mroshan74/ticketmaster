import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

function TickFilter(props) {
  const { emps , depts , tickets , customers } = props
    const result = tickets.filter(ticket => 
      ticket.code.toLowerCase().includes(props.auto.toLowerCase())
    ).filter(tick => tick.isResolved===props.status)

    return (
      <div>
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
            {result.map((ticket, i) => {
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
                        props.handleRemove(ticket._id)
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
                          props.handleStatusComplete(
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
      </div>
    )
}

const mapStateToProps = (state) => {
    return {
        emps:state.emps,
        depts:state.depts,
        tickets:state.tickets,
        customers:state.customers
    }
}

export default connect(mapStateToProps)(TickFilter)
