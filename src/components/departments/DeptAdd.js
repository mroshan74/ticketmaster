import React, { Component } from 'react'
import { connect } from 'react-redux'
import { startAddDept } from '../../redux/actions/deptsAction'

export class DeptAdd extends Component {
    constructor(){
        super()
        this.state = {
            name:''
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { name } = this.state
        const deptAdd = {
            name:name
        }
        console.log('deptAdd', deptAdd)
        this.props.dispatch(startAddDept(deptAdd))
    }
    render() {
        return (
            <div>
                <h2>Add Department</h2>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="name" id="name" value={this.state.name} onChange={this.handleChange} />
                    <br/><br/>
                    <input type="submit" value="Add"/>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        depts:state.depts
    }
}

export default connect(mapStateToProps)(DeptAdd)
