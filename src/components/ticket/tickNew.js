import React, { Component } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import { startAddTickets } from '../../redux/actions/ticketAction'

class tickNew extends Component {
  constructor() {
    super()
    this.state = {
      code: '',
      customer: '',
      department: '',
      employees: [],
      priority: '',
      message: '',
      empsOption: [],
    }
  }

  handleChange = (e) => {
    const { emps } = this.props
    this.setState({ [e.target.name]: e.target.value })

    if (e.target.name === 'department') {
      const filterDepts = emps.filter(
        (emp) => emp.department._id === e.target.value
      )
      const multiOption = [].concat(
        filterDepts.map((option) => {
          return { value: option._id, label: option.name }
        })
      )
      this.setState({
        empsOption: multiOption,
      })
    }
  }

  handleRadio = (type) => {
    this.setState({ priority: type })
  }

  handleMultiValue = (options) => {
    const employees = options.map((option) => {
      return Object.assign({}, {_id:option.value})
    })
    //console.log('multi-value',employees)
    this.setState({
      employees,
    })
  }

  handleSubmit = (e) => {
      e.preventDefault()
      const { code , customer , department , employees , priority , message } = this.state
      const redirect = () => {
          return this.props.history.push('/tickets')
      }
      const formData = {
        code,
        customer,
        department,
        employees,
        priority,
        message,
      }
      console.log('ticket-new',formData)
      this.props.dispatch(startAddTickets(formData,redirect))
    }
  

  render() {
    const { depts, customers } = this.props
    //console.log('state-emps',this.state.employees)
    //console.log('empsOption',this.state.empsOption)
    //console.log('depts',depts)
    //console.log('radio', this.state.priority)
    return (
      <div>
        <h1>Add Ticket</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='code'>code</label>
          <br />
          <input
            type='text'
            name='code'
            id='code'
            value={this.state.code}
            onChange={this.handleChange}
          />
          <br />

          <label htmlFor='customer'>Customer</label>
          <br />
          <select
            id='customer'
            name='customer'
            value={this.state.customer}
            onChange={this.handleChange}
          >
            <option value='select'>---select---</option>
            {customers.map((ele) => {
              return (
                <option key={ele._id} value={ele._id}>
                  {ele.name}
                </option>
              )
            })}
          </select>
          <br />

          <label htmlFor='department'>Department</label>
          <br />
          <select
            id='department'
            name='department'
            value={this.state.department}
            onChange={this.handleChange}
          >
            <option value='select'>---select---</option>
            {depts.map((dept) => {
              return (
                <option key={dept._id} value={dept._id}>
                  {dept.name}
                </option>
              )
            })}
          </select>
          <br />

          <label htmlFor='employees'>Employees</label>
          <Select
            isMulti
            id='employees'
            name='employees'
            options={this.state.empsOption}
            onChange={this.handleMultiValue}
          />
          <br />

          <label htmlFor='message'>Message</label>
          <br />
          <textarea name='message' id='message' value={this.state.message} onChange={this.handleChange} cols='30' rows='10' />
          <br />

          <input
            type='radio'
            name='priority'
            id='high'
            value={this.state.priority}
            onChange={() => {
              this.handleRadio('high')
            }}
          />
          <label htmlFor='high'>High</label>
          <br />
          <input
            type='radio'
            name='priority'
            id='medium'
            value={this.state.priority}
            onChange={() => {
              this.handleRadio('medium')
            }}
          />
          <label htmlFor='medium'>Medium</label>
          <br />
          <input
            type='radio'
            name='priority'
            id='low'
            value={this.state.priority}
            onChange={() => {
              this.handleRadio('low')
            }}
          />
          <label htmlFor='low'>Low</label>
          <br />
          <br />

          <input type='submit' value='Submit' />
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    emps: state.emps,
    depts: state.depts,
    customers: state.customers,
  }
}

export default connect(mapStateToProps)(tickNew)
