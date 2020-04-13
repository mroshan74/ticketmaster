import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import StatusDepts from './StatusDepts'

export class ShowDept extends Component {
    constructor(){
        super()
        this.state = {
            name:''
        }
    }
    render() {
        console.log(this.props)
        const id=this.props.match.params.id 
        const {deptById} = this.props
        return (
          <div>
            <h2>
              {deptById && this.props.deptById.name}
            </h2>
            <Link to={`/departments/edit/${id}`}>Edit</Link>
            <StatusDepts id={id} />
          </div>
        )
    }
}

const mapStateToProps = (state,props) =>{
    const id=props.match.params.id
    console.log('MSTP-showdept',state)
    return {
      deptById: state.depts.find(ele => ele._id===id)
    }
    
}

export default connect(mapStateToProps)(ShowDept)
