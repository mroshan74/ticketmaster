import React, { Component } from 'react'
import { connect } from 'react-redux'
import { startAddEmp } from '../../redux/actions/EmpsAction'

class EmpNew extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      mobile: '',
      deptId:'',
    }
  }
  componentDidMount(){
      if(this.props.depts.length===0){
          alert('Create a department first to add employees')
          this.props.history.push('/departments')
      }
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { name, email, mobile, deptId } = this.state
    const newEmpData = {
      name,
      email,
      mobile,
      department:deptId
    }
    const redirect = () => {
      return this.props.history.push('/employees')
    }
    console.log('newEmpData', newEmpData)
    this.props.dispatch(startAddEmp(newEmpData,redirect))
}

  render() {
    return (
      <div>
        <h1>Add Employee</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='name'>Name </label>
          <input
            type='text'
            name='name'
            id='name'
            value={this.state.name}
            onChange={this.handleChange}
          />
          <br />
          <br />

          <label htmlFor='email'>Email </label>
          <input
            type='email'
            name='email'
            id='email'
            value={this.state.email}
            onChange={this.handleChange}
          />
          <br />
          <br />

          <label htmlFor='mobile'>Mobile </label>
          <input
            type='mobile'
            name='mobile'
            id='mobile'
            value={this.state.mobile}
            onChange={this.handleChange}
          />
          <br />
          <br />
          <select id='deptId' name='deptId' value={this.state.deptId} onChange={this.handleChange}>
              <option value='select'>---select---</option>
            {this.props.depts.map((ele,i) =>{
                return <option key={i} value={`${ele._id}`}>{ele.name}</option>
            })}
          </select>
          <br/>
          <br/>

          <input type='submit' value='Add' />
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('MSTP-newEmp', state)
  return {
    emps:state.emps,
    depts:state.depts
  }
}

export default connect(mapStateToProps)(EmpNew)
