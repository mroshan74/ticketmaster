import React, { Component } from 'react'
import { connect } from 'react-redux'
import { startRegisterNew } from '../../redux/actions/loginActions'

class Register extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      email: '',
      password: '',
      msg:'',
      redirect:false
    }
  }

  handleChange = (e) => {
    this.setState({ 
        [e.target.name]: e.target.value, 
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const redirect = () => {
      return this.props.history.push('/login')
    }
    const { username, email, password } = this.state
    const registerData = {
      username,
      email,
      password,
    }
    this.props.dispatch(startRegisterNew(registerData,redirect))
    console.log(registerData)
  }
  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          <input type='text' name='username' id='username' value={this.state.username} onChange={this.handleChange} placeholder={'username'} />
          <br/><br/>

          <input type='email' name='email' id='email' value={this.state.email} onChange={this.handleChange} placeholder={'email'} />
          <br/><br/>

          <input type='password' name='password' id='password' value={this.state.password} onChange={this.handleChange} placeholder={'password'} />
          <br/><br/>

          <input type='submit' value='Register' />
        </form>
      </div>
    )
  }
}

export default connect()(Register)
