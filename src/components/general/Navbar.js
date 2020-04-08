import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

function Navbar(props) {
  const change = localStorage.getItem('token')
  console.log('nav-token',change)
  return (
    <div>
      <nav>
        <Link to='/'>Home</Link>
        {change ? (
          <Fragment>
            <Link to='/customers'>Customers</Link>
            <Link to='/departments'>Departments</Link>
            <Link to='/employees'>Employees</Link>
            <Link to='/tickets'>Tickets</Link>
            <Link to='Logout'>Logout</Link>
          </Fragment>
        ) : (
          <Fragment>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
          </Fragment>
        )}
      </nav>
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log('MSTP-nav', state)
  return {
    login: state.login,
  }
}
export default connect(mapStateToProps)(Navbar)
