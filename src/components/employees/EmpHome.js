import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { startDelEmp } from '../../redux/actions/EmpsAction'

class EmpHome extends Component {
  constructor() {
    super()
    this.state = {
      reload: false,
    }
  }

  handleRemove = (id) => {
    const confirm = window.confirm('Are you sure?')
    if (confirm) {
      this.props.dispatch(startDelEmp(id))
    }
  }

  refreshComponent = () => {
    this.setState({ reload: true }, () => this.setState({ reload: false }))
  }

  render() {
    const { emps } = this.props
    return (
      <div>
        <Fragment>
          <h1>Employees - {emps.length}</h1>
          <table border='1'>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Department</th>
                <th>Actions</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {emps.map((emp, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td> {emp.name} </td>
                    <td> {emp.email} </td>
                    <td> {emp.mobile} </td>
                    <td> {emp.department ? emp.department.name : ''} </td>
                    <td>
                      <Link to={`/employee/${emp._id}`}>
                        <button>Show</button>
                      </Link>
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          this.handleRemove(emp._id)
                        }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <Link to='/employee/new'>Add Employee</Link>
        </Fragment>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  console.log('MSTP-emps', state)
  return {
    emps: state.emps,
    depts: state.depts,
  }
}

export default connect(mapStateToProps)(EmpHome)
