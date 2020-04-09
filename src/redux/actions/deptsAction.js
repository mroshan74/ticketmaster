import axios from 'axios'

const getToken = localStorage.getItem('token')

//---------------fetch data of departments

export const setDepts = (depts) => {
    return { type: 'SET_DEPTS' , payload: depts }
}

export const startGetDepts = () => {
    return(dispatch) => {
        axios.get(`http://dct-ticket-master.herokuapp.com/departments`,{
            headers: {
                'x-auth': getToken
            }
        })
            .then((response) =>{
                console.log('[PROMISE-depts-set]',response.data)
                const deptGet = response.data
                dispatch(setDepts(deptGet))
            })
            .catch((err) => {
                console.log('[ERROR-depts-set]',err)
            })
        }
}

//---------------add a department

export const addDept = (data) => {
    return { type: 'ADD_DEPT', payload: data }
}

export const startAddDept = (add) =>{
    return (dispatch) => {
        axios.post(`http://dct-ticket-master.herokuapp.com/departments`,add,{
            headers: {
                'x-auth': getToken
            }
        })
            .then((response) =>{
                console.log('[PROMISE-depts-add]',response.data)
                const deptAdd = response.data
                dispatch(addDept(deptAdd))
            })
            .catch((err) => {
                console.log('[ERROR-depts-add]',err)
            })
        }
}

//---------------delete a department

export const deleteDept = (id) => {
  return { type: 'DELETE_DEPT', payload: id }
}

export const startDeleteDept = (id) => {
  return (dispatch) => {
    axios
      .delete(`http://dct-ticket-master.herokuapp.com/departments/${id}`, {
        headers: {
          'x-auth': getToken,
        },
      })
      .then((response) => {
        console.log('[PROMISE-depts-delete]', response.data)
        dispatch(deleteDept(id))
      })
      .catch((err) => {
        console.log('[ERROR-depts-delete]', err)
      })
  }
}

//---------------edit a department

export const editDept = (id,data) => {
  return { type: 'EDIT_DEPT', payload: {id,data} }
}

export const startEditDept = (id,data,redirect) => {
  return (dispatch) => {
    axios
      .put(`http://dct-ticket-master.herokuapp.com/departments/${id}`,data, {
        headers: {
          'x-auth': getToken,
        },
      })
      .then((response) => {
        console.log('[PROMISE-depts-edit]', response.data)
        const resData=response.data
        if(resData.hasOwnProperty('errors')){
            alert('invalid data')
        }
        else{
            dispatch(editDept(id,resData))
            redirect()
        }
      })
      .catch((err) => {
        console.log('[ERROR-depts-edit]', err)
      })
  }
}


