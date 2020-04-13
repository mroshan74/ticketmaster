import React, { Component } from 'react'
import { connect } from 'react-redux'
import TickNew from './TickNew'

class tickEdit extends Component {
    redirect = () => {
        this.props.history.push('/tickets')
    }
    
    render() {
        const { ticket } = this.props
        console.log('-----EDIT----',ticket)
        return (
            <div>{ticket &&
                    <TickNew edit={ticket} id={this.props.match.params.id} redirect={this.redirect} />
                }
            </div>
        )
    }
}

const mapStateToProps = (state,props) => {
    const id = props.match.params.id
    return {
        ticket : state.tickets.find(ele => ele._id===id)
    }
}

export default connect(mapStateToProps)(tickEdit)
