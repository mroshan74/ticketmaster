import axios from 'axios'

const getToken = localStorage.getItem('token')

//---------------fetch single department by id

export const setDeptById = (data) => {
    return { type: 'SET_DEPT_BY_ID', payload: data }
}

export const startSetDeptById = (id) => {
    return(dispatch) =>{
        axios.get(`http://dct-ticket-master.herokuapp.com/departments/${id}`,{
            headers:{
                'x-auth': getToken
            }
        })
            .then((response)=>{
                console.log('[PROMISE-getById-dept]',response.data)
                const getData=response.data
                dispatch(setDeptById(getData))
            })
            .catch((err)=>{
                console.log('[ERROR-getById-dept]',err)
            })
    }
}

//--------------------fetch single employee by id

export const setEmpById = (data) => {
    return { type: 'SET_EMP_BY_ID' , payload: data }
}

export const startSetEmpById = (id) => {
    return (dispatch) => {
        axios
          .get(`http://dct-ticket-master.herokuapp.com/employees/${id}`, {
            headers: {
              'x-auth': getToken,
            },
          })
          .then((response) => {
            console.log('[PROMISE-getById-emp]', response.data)
            const getEmp = response.data
            dispatch(setEmpById(getEmp))
          })
          .catch((err) => {
            console.log('[ERROR-getById-emp]', err)
          })
    }
}
