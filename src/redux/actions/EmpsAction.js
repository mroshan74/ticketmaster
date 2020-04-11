import axios from 'axios'

const getToken = localStorage.getItem('token')

//---------------fetch data and store

export const setEmps = (data) => {
    return { type: 'SET_EMPS' , payload: data }
}

export const startSetEmps = () => {
    return(dispatch) => {
        axios.get(`http://dct-ticket-master.herokuapp.com/employees`,{
            headers:{
                'x-auth':getToken
            }
        })
            .then((response) => {
                console.log('[PROMISE-get-emps]',response.data)
                const getEmps = response.data
                dispatch(setEmps(getEmps))
            })
            .catch((err) =>{
                console.log('[ERROR-get-emps]',err)
            })
    }
}

//-----------------post new employee data

export const addEmp = (data) => {
    return { type: 'ADD_EMP', payload: data }
}

export const startAddEmp = (data,redirect) => {
    return (dispatch) => {
        axios.post(`http://dct-ticket-master.herokuapp.com/employees`,data,{
            headers:{
                'x-auth':getToken
            }
        })
            .then((response) => {
                console.log('[PROMISE-newEmp]',response.data)
                const addResponse = response.data
                if(addResponse.hasOwnProperty('errors')){
                    alert('invalid data')
                }
                else{
                    dispatch(addEmp(addResponse))
                    redirect()
                }
            })
    }
}

//------------------------ delete an employee

export const delEmp = (id) =>{
    return { type: 'DEL_EMP' , payload: id}
}

export const startDelEmp = (id) => {
    return (dispatch) => {
        axios.delete(`http://dct-ticket-master.herokuapp.com/employees/${id}`, {
          headers: {
            'x-auth': getToken,
          }
        })
            .then((response) => {
                console.log('[PROMISE-delEmp]',response.data)
                dispatch(delEmp(id))
                alert('Deleted')
            })
            .catch((err) => {
                console.log('[ERROR-delEmp]',err)
            })
    }
}

//----------------------update emp 

export const updateEmp = (id,data) => {
  return { type: 'UPDATE_EMP', payload: {id,data} }
}

export const startUpdateEmp = (id,data,redirect) => {
  return (dispatch) => {
    axios
      .put(`http://dct-ticket-master.herokuapp.com/employees/${id}`,data, {
        headers: {
          'x-auth': getToken,
        },
      })
      .then((response) => {
        console.log('[PROMISE-delEmp]', response.data)
        const update = response.data
        if(update.hasOwnProperty('errors')){
            alert(update.message)
        }
        else{
            dispatch(updateEmp(id,update))
            redirect()
        }
      })
      .catch((err) => {
        console.log('[ERROR-updateEmp]', err)
      })
  }
}