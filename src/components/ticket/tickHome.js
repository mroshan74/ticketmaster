import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import {
  startRemoveTickets,
  startUpdateTickets,
} from '../../redux/actions/ticketAction'
import TickFilter from './TickFilter'
import TickCharts from './TickCharts'

class tickHome extends Component {
  constructor() {
    super()
    this.state = {
      filterCode: '',
      status: false,
    }
  }

  percent = () => {
    const { tickets } = this.props
    const completed = tickets.filter((ticket) => ticket.isResolved).length
    const round = Math.ceil((completed / tickets.length) * 100)
    return `${round}`
  }
  chartTable = () => {
    const { depts, tickets } = this.props
    const result = depts.map((dept) => {
      let count = tickets.filter(
        (ticket) => ticket.department === dept._id && !ticket.isResolved
      ).length
      return [].concat([`${dept.name}`, count])
    })
    console.log(result)
    return result
  }
  handleRemove = (id) => {
    const confirm = window.confirm('Are you sure?')
    if (confirm) {
      this.props.dispatch(startRemoveTickets(id))
    }
  }

  handleStatusComplete = (id, status) => {
    this.props.dispatch(startUpdateTickets(id, { isResolved: !status }))
  }

  handleFilterCode = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleChangeStatus = (status) => {
    this.setState({
      status,
    })
  }

  render() {
    const { filterCode, status } = this.state
    const { tickets } = this.props
    
    return (
      <div>
        <button
          onClick={() => {
            this.handleChangeStatus(false)
          }}
        >
          Pending
        </button>
        <button
          onClick={() => {
            this.handleChangeStatus(true)
          }}
        >
          Completed
        </button>

        <h2>
          Tickets - {tickets.filter((ticket) => !ticket.isResolved).length}
        </h2>
        <input
          type='text'
          name='filterCode'
          id='filterCode'
          value={filterCode}
          onChange={this.handleFilterCode}
          placeholder='Search code...'
        />
        <TickFilter
          auto={filterCode}
          handleRemove={this.handleRemove}
          handleStatusComplete={this.handleStatusComplete}
          status={status}
        />
        <Link to='/ticket/new'> Add ticket</Link>
        <br />
        <br />
        <p>
          <em>completed tickets: {this.percent()}% </em>
        </p>
        <progress value={this.percent()} max='100' />
        <TickCharts chartTable={this.chartTable} tickets={tickets} />
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
