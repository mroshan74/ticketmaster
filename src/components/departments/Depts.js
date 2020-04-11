import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import DeptAdd from './DeptAdd'
import { startDeleteDept } from '../../redux/actions/deptsAction'

class Depts extends Component {
    handleRemove = (id) =>{
        this.props.dispatch(startDeleteDept(id))
    }
    render() {
        return (
          <div>
            <h1>Departments - {this.props.depts.length} </h1>
            <ul>{this.props.depts.map((ele,i) =>{
                return <li key = {i}> <div>
                        <p>{ele.name}</p>
                        <Link to={`/departments/${ele._id}`}><button>Show</button></Link>
                        <button onClick={()=>{this.handleRemove(ele._id)}}>Remove</button>
                    </div> 
                </li>
            })}</ul>
            <DeptAdd />
          </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log('MSTP', state)
    return{
        depts: state.depts
    }
}

export default connect(mapStateToProps)(Depts)
