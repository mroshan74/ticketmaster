import React, { Component } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import {
  startAddTickets,
  startUpdateTickets,
} from '../../redux/actions/ticketAction'

class TickNew extends Component {
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
      selectValues:[]
    }
  }

  componentDidMount() {
    console.log('edit props new', this.props.edit)
    if (this.props.edit) {
      const {
        code,
        customer,
        department,
        employees,
        priority,
        message,
      } = this.props.edit
      this.setState(
        {
          code,
          customer,
          department,
          employees,
          priority,
          message,
        },
        () => {
          setTimeout(()=>{
            this.settingUpState()
            console.log('after setState of edit****', this.state)
          },300)
        }
      )
    }
  }

  settingUpState = () => {
    console.log('setting up state', this.state)
    const { emps } = this.props
    //if (emps.length > 0) {
      // filtering employees by department they belong using id
      const filterDepts = emps.filter(
        (emp) => emp.department._id === this.state.department
      )
      const multiOption = filterDepts.map((option) => {
          return { value: option._id, label: option.name }
        })
  
      const { employees } = this.props.edit
      
  
      // setting the values of option from the employee id for the select
      const setOptions = employees.map(emp => {
        return { value: emp._id, label:(emps.find(ele => ele._id===emp._id)).name}
      })
  
      this.setState({
        selectValues:setOptions,
        empsOption:multiOption
      })
    //}
  }

  handleChange = (e) => {
    const { emps } = this.props
    this.setState({ [e.target.name]: e.target.value })

    // filtering employees by department they belong using id
    if (e.target.name === 'department') {
      this.setState({selectValues:[]})
      const filterDepts = emps.filter(
        (emp) => emp.department._id === e.target.value
      )
      const multiOption = filterDepts.map((option) => {
          return { value: option._id, label: option.name }
        })
      this.setState({
        empsOption: multiOption,
      })
    }
  }

  handleRadio = (type) => {
    this.setState({ priority: type })
  }

  // creating an selected option and changing to data format to be passed to api request
  handleMultiValue = (options) => {
    if (options) {
      const employees = options.map((option) => {
        return Object.assign({}, { _id: option.value })
      })
      //console.log('multi-value',employees)
      console.log('options',options)
      this.setState({
        employees,
        selectValues: options
      })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {
      code,
      customer,
      department,
      employees,
      priority,
      message,
    } = this.state
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
    console.log('ticket-new', formData)
    if (this.props.edit) {
      const id = this.props.id
      this.props.dispatch(startUpdateTickets(id, formData, this.props.redirect))
    } else {
      this.props.dispatch(startAddTickets(formData, redirect))
    }
  }

  render() {
    const { depts, customers } = this.props
    //console.log('state-emps',this.state.employees)
    //console.log('empsOption',this.state.empsOption)
    //console.log('depts',depts)
    console.log('radio', this.state)
    return (
      <div>
        {this.props.edit ? <h1>Edit Ticket</h1> : <h1>Add Ticket</h1>}
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
            value={this.state.selectValues}
            options={this.state.empsOption}
            onChange={this.handleMultiValue}
          />
          <br />

          <label htmlFor='message'>Message</label>
          <br />
          <textarea
            name='message'
            id='message'
            value={this.state.message}
            onChange={this.handleChange}
            cols='30'
            rows='10'
          />
          <br />

          <input
            type='radio'
            name='priority'
            id='high'
            checked={this.state.priority === 'high'}
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
            checked={this.state.priority === 'medium'}
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
            checked={this.state.priority === 'low'}
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

export default connect(mapStateToProps)(TickNew)
