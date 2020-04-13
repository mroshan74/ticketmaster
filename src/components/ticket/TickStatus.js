import React, { Component } from 'react'
import TickShow from './TickShow'
import { connect } from 'react-redux'

class TickStatus extends Component {
    constructor(){
        super()
        this.state={
            status:'all'
        }
    }

    handleChangeStatus = (status) => {
        this.setState({status})
    }

    render() {
        const { tickets } = this.props
        console.log(this.props)
        return (
            <div>
                <button onClick={()=>{this.handleChangeStatus('all')}}>All</button>
                <button onClick={()=>{this.handleChangeStatus(false)}}>Pending</button>
                <button onClick={()=>{this.handleChangeStatus(true)}}>Completed</button>
                {tickets.map((ticket,i) =>{
                    return (
                      <TickShow key={i} status={this.state.status} ticket={ticket} />
                    )
                })}
            </div>
        )
    }
}

const mapStateToProps =(state,props) =>{
    const id = props.id
    console.log('MSTP-tickStatus',state,'props-id',id,props)
    return {
        tickets: state.tickets.filter(ele => ele.customer===id)
    }
}

export default connect(mapStateToProps)(TickStatus)
