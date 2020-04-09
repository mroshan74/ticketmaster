import axios from 'axios'

const getToken = localStorage.getItem('token')

//---------------fetch customers from server 

export const setGetCustomer = (customer) => {
  return { type: 'SET_GET_CUSTOMER', payload: customer }
}

export const startGetCustomers = () => {
    return (dispatch) => {
        axios.get(`http://dct-ticket-master.herokuapp.com/customers`, {
          headers: {
            'x-auth': getToken,
          }
        })
            .then((response)=>{
                console.log('[PROMISE-getCustomer]',response.data)
                const getResponse = response.data
                dispatch(setGetCustomer(getResponse))
            })
            .catch((err) => {
                console.log('[ERROR-getCustomer]',err)
            })
    }
}

//---------------create new customers

export const setNewCustomer = (customer) => {
  return { type: 'SET_NEW_CUSTOMER', payload: customer }
}

export const startSetNewCustomer = (customerData,redirect) => {
    return (dispatch) => {
    axios.post(`http://dct-ticket-master.herokuapp.com/customers`,customerData,{
        headers: {
            'x-auth' : getToken
        }
    })
        .then((response)=>{
            console.log('[PROMISE-newCustomer]',response.data)
            const addResponse = response.data
            if(addResponse.hasOwnProperty('errors')){
                alert('invalid details')
            }
            else{
                dispatch(setNewCustomer(addResponse))
                redirect()
            }
        })
        .catch((err)=>{
            console.log('[ERROR-newCustomer]',err)
        })
    }
} 

//---------------edit details of a single customer

export const setEditCustomer = (id, data) => {
  return { type: 'SET_EDIT_CUSTOMER', payload: { id, data } }
}

export const startEditCustomer = (customerData,id,redirect) => {
  return (dispatch) => {
    axios
      .put(`http://dct-ticket-master.herokuapp.com/customers/${id}`, customerData, {
        headers: {
          'x-auth': getToken,
        },
      })
      .then((response) => {
        console.log('[PROMISE-editCustomer]', response.data)
        const addResponse = response.data
        if (addResponse.hasOwnProperty('errors')) {
          alert('invalid details')
        } else {
          dispatch(setEditCustomer(id,addResponse))
          redirect()        
        }
      })
      .catch((err) => {
        console.log('[ERROR-editCustomer]', err)
      })
  }
}

//---------------fetch details of a single customer using id

export const setSingleCustomer = (customer) => {
  return { type: 'SET_SINGLE_CUSTOMER', payload: customer }
}

export const startSingleCustomer = (id) => {
  return (dispatch) => {
    axios
      .get(
        `http://dct-ticket-master.herokuapp.com/customers/${id}`,
        {
          headers: {
            'x-auth': getToken,
          },
        }
      )
      .then((response) => {
        console.log('[PROMISE-singleCustomer]', response.data)
        const getResponse = response.data
        if (getResponse.hasOwnProperty('errors')) {
          alert('invalid details')
        } else {
          dispatch(setSingleCustomer(getResponse))
        }
      })
      .catch((err) => {
        console.log('[ERROR-singleCustomer]', err)
      })
  }
} 

//---------------delete customer using id

export const deleteCustomer = (id) => {
  return { type: 'DELETE_CUSTOMER', payload: id }
}

export const startDeleteCustomer = (id) => {
  return (dispatch) => {
    axios
      .delete(`http://dct-ticket-master.herokuapp.com/customers/${id}`, {
        headers: {
          'x-auth': getToken,
        },
      })
      .then((response) => {
        console.log('[PROMISE-deleteCustomer]', response.data)
        dispatch(deleteCustomer(id))
        })
      .catch((err) => {
        console.log('[ERROR-deleteCustomer]', err)
      })
  }
} 