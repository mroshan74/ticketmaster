import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { startSetDeptById, setDeptById } from '../../redux/actions/byIdsAction'

export class ShowDept extends Component {
    constructor(){
        super()
        this.state = {
            name:''
        }
    }
    componentDidMount(){
        if (Object.keys(this.props.deptById).length === 0) {
          this.props.dispatch(startSetDeptById(this.props.match.params.id))
        } else {
          this.setState({ name: this.props.deptById.name })
          this.props.dispatch(setDeptById(this.props.deptById))
        }
    }
    render() {
        console.log(this.props)
        const id=this.props.match.params.id
        const {name} = this.state
        return (
          <div>
            <h2>
              {name || this.props.deptById.name}
            </h2>
            <Link to={`/departments/edit/${id}`}>Edit</Link>
          </div>
        )
    }
}

const mapStateToProps = (state,props) =>{
    const id=props.match.params.id
    console.log('MSTP-showdept',state)
    if(state.depts.length === 0){
        return{
            deptById: state.byIds
        }   
    }
    else{
        return {
            deptById: state.depts.find(ele => ele._id===id)
        }
    }
}

export default connect(mapStateToProps)(ShowDept)
