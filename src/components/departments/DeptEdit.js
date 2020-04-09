import React, { Component } from 'react'
import { connect } from 'react-redux'
import { startSetDeptById } from '../../redux/actions/byIdsAction'
import { startEditDept } from '../../redux/actions/deptsAction'

export class DeptEdit extends Component {
  componentDidMount() {
    if (Object.keys(this.props.deptById).length === 0) {
      this.props.dispatch(startSetDeptById(this.props.match.params.id))
    }
  }
  passData = (data) =>{
    const id= this.props.match.params.id
    const redirect = () =>{
        return this.props.history.push(`/departments/${id}`)
    }
    this.props.dispatch(startEditDept(id,data,redirect))
  }
  render() {
    return (
    <div>
        {Object.keys(this.props.deptById).length > 0 && <EditDept passData={this.passData} data={this.props.deptById}/> }
    </div>)
  }
}

const mapStateToProps = (state) => {
  console.log('MSTP-edit-dept', state)
  return {
    deptById: state.byIds,
  }
}

class EditDept extends Component {
  constructor(props) { 
    super(props)
    this.state = {
      name: props.data.name ? props.data.name:'',
    }
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { name } = this.state
    const deptEdit = {
      name
    }
    console.log('dept-edit-form', deptEdit)
    this.props.passData(deptEdit)
  }
  render() {
    return (
      <div>
        <h2>Edit Department</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type='text'
            name='name'
            id='name'
            value={this.state.name}
            onChange={this.handleChange}
          />
          <br />
          <br />
          <input type='submit' value='Change' />
        </form>
      </div>
    )
  }
}

export default connect(mapStateToProps)(DeptEdit)
