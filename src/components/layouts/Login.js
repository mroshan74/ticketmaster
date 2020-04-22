import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { startLogin } from '../../redux/actions/loginActions'

class Login extends Component {
  constructor() {
    super()
    this.state = {
        email: '',
        password: '',
        redirect: false
    }
  }

  handleChange = (e) => {
      this.setState({[e.target.name]:e.target.value})
  }

  handleSubmit = (e) => {
      e.preventDefault()
      const { email, password } = this.state
      const loginData = {
          email:email,
          password:password
      }
      console.log('loginData',loginData)
      this.props.dispatch(startLogin(loginData))
      this.setState({redirect:true})
  }
  render() {
    const {redirect , email, password } = this.state
    return (
      <div>
        {(redirect && this.props.login) && <Redirect to='/' />}
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type='email'
            name='email'
            id='email'
            value={email}
            onChange={this.handleChange}
            placeholder="Email"
          />
          <br />
          <br />

          <input
            type='password'
            name='password'
            id='password'
            value={password}
            onChange={this.handleChange}
            placeholder='password'
          />
          <br />
          <br />

          <input type='submit' value='submit' />
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    console.log('MSTP-login-state',state)

    return{
      login: state.login
    }
}

export default connect(mapStateToProps)(Login)
