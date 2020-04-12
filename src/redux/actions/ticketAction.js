import axios from 'axios'

const getToken = localStorage.getItem('token')

//-----------------fetch and set data from the server to store

export const setTickets = (data) =>{
    return { type: 'SET_TICKETS' , payload: data}
}

export const startSetTickets = () => {
    return (dispatch) => {
        axios.get(`http://dct-ticket-master.herokuapp.com/tickets`,{
            headers:{
                'x-auth':getToken
            }
        })
            .then((response)=>{
                console.log('[PROMISE-set-tick]',response.data)
                const getData = response.data
                dispatch(setTickets(getData))
            })
            .catch((err) => {
                console.log('[ERRORS]',err)
            })
    }
}

//------------------------add ticket

export const addTickets = (data) => {
    return { type: 'ADD_TICKET', payload: data }
}

export const startAddTickets = (data,redirect) =>{
    return (dispatch) => {
      axios
        .post(`http://dct-ticket-master.herokuapp.com/tickets`,data, {
          headers: {
            'x-auth': getToken,
          },
        })
        .then((response) => {
          console.log('[PROMISE-add-tick]', response.data)
          const sentData = response.data
          if(sentData.hasOwnProperty('errors')){
              alert('invalid data')
          }else{
              dispatch(addTickets(sentData))
              redirect()
          }
        })
        .catch((err) => {
          console.log('[ERRORS -add -tick]', err)
        })
    }
}

//-----------------------remove ticket

export const removeTickets = (id) => {
  return { type: 'REMOVE_TICKET', payload: id }
}

export const startRemoveTickets = (id) => {
  return (dispatch) => {
    axios
      .delete(`http://dct-ticket-master.herokuapp.com/tickets/${id}`, {
        headers: {
          'x-auth': getToken,
        },
      })
      .then((response) => {
        console.log('[PROMISE-del-tick]', response.data)
          alert('ticket removed')
          dispatch(removeTickets(id))
      })
      .catch((err) => {
        console.log('[ERRORS -del -tick]', err)
      })
  }
}

//----------------------update ticket

export const updateTickets = (id,data) => {
  return { type: 'UPDATE_TICKET', payload: {id,data} }
}

export const startUpdateTickets = (id,data) => {
  return (dispatch) => {
    axios
      .put(`http://dct-ticket-master.herokuapp.com/tickets/${id}`,data, {
        headers: {
          'x-auth': getToken,
        },
      })
      .then((response) => {
        console.log('[PROMISE-update-tick]', response.data)
        const upData = response.data
        if(upData.hasOwnProperty('errors')){
            alert('invalid data')
        }
        else{
            alert('updated')
            dispatch(updateTickets(id,upData))
        }
      })
      .catch((err) => {
        console.log('[ERRORS -update -tick]', err)
      })
  }
}