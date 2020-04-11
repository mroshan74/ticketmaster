import React, { Component , Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

//import { startSetEmpById } from '../../redux/actions/byIdsAction'


class EmpShow extends Component {
    // componentDidMount(){
    //     const id = this.props.match.params.id
    //     if (Object.keys(this.props.emp).length===0) {
    //         this.props.dispatch(startSetEmpById(id))
    //     }
    // }
    render() {
        const {emp} = this.props
        const id = this.props.match.params.id
        return (
            <div>
                {emp &&
                <Fragment>
                    <h2>{emp.name} - {emp.email}</h2>
                    <Link to={`/employee/edit/${id}`}>Edit</Link>
                </Fragment>
                }
            </div>
        )
    }
}

const mapStateToProps = (state,props) => {
    const id = props.match.params.id
    // if(state.emps.length===0){
    //     return {
    //         emp: state.byIds
    //     }
    // }else{
        return{
            emp: state.emps.find(emp => emp._id  === id)
        }
    //}
}

export default connect(mapStateToProps)(EmpShow)
