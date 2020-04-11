import React, { Component , Fragment } from 'react'
import { connect } from 'react-redux'
import EmpForm from './EmpForm'
import { startUpdateEmp } from '../../redux/actions/EmpsAction'

class EmpEdit extends Component {
    passData = (data) => {
        const id = this.props.match.params.id
        const redirect = () => {
          return this.props.history.push('/employees')
        }
        this.props.dispatch(startUpdateEmp(id,data,redirect))
    }
    render() {
        const { emp } = this.props
        console.log(this.emp)
        return (
          <div>
              <h2>Edit Employee</h2>
            {
                emp && <Fragment>
                    <EmpForm data={emp} passData={this.passData}/>
                </Fragment>
            }
          </div>
        )
    }
}

const mapStateToProps = (state,props) => {
    const id = props.match.params.id
    console.log('MSTP-emp-edit', state,props)
    return{
        emp: state.emps.find(emp => emp._id===id)
    }
}

export default connect(mapStateToProps)(EmpEdit)
