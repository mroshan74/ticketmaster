import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

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
         msg: '' 
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { username, email, password } = this.state
    const registerData = {
      username: username,
      email: email,
      password: password,
    }
    axios.post(`http://dct-ticket-master.herokuapp.com/users/register`,registerData)
        .then((response) =>{
            console.log('[promise]',response.data)
            if(response.data.hasOwnProperty('errors')){
                this.setState({msg:response.data.message})
            }
            else{
                this.setState({redirect:true})
            }
        })
        .catch((err) => {
            console.log('[error]',err)
        })
    console.log(registerData)
  }
  render() {
    const {msg,redirect} =this.state
    return (
      <div>
        {msg && alert(`${this.state.msg}`)}
        {redirect && <Redirect to ='/login'/>}
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

export default Register
