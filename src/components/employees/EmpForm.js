import React, { Component } from 'react'
import { connect } from 'react-redux'

class EmpForm extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      mobile: '',
      deptId: '',
    }
  }
  componentDidMount() {
    const { name, email, mobile } = this.props.data
    this.setState({
        name,
        email,
        mobile,
        deptId: this.props.data.department._id
    })
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { name, email, mobile, deptId } = this.state
    const editEmpData = {
      name,
      email,
      mobile,
      department: deptId,
    }
    console.log('editEmpData', editEmpData)
    this.props.passData(editEmpData)
  }

  render() {
    return (
      <div>
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
          <select
            id='deptId'
            name='deptId'
            value={this.state.deptId}
            onChange={this.handleChange}
          >
            <option value='select'>---select---</option>
            {this.props.depts.map((ele, i) => {
              return (
                <option key={i} value={`${ele._id}`}>
                  {ele.name}
                </option>
              )
            })}
          </select>
          <br />
          <br />

          <input type='submit' value='Submit' />
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
    return {
        depts: state.depts
    }
}

export default connect(mapStateToProps)(EmpForm)
