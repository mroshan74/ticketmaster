import axios from 'axios'

//--------------------------logging in and set token
const getToken = localStorage.getItem('token')

export const setToken = (authToken) => {
    return { type : 'SET_TOKEN', payload: authToken }
}

export const startLogin = (loginData) =>{
    return (dispatch) => {
        axios.post(`http://dct-ticket-master.herokuapp.com/users/login`,loginData)
            .then((response) => {
                console.log('[PROMISE-login]', response.data)
                if (response.data.hasOwnProperty('error')) {
                  alert('invalid username/password')
                } else {
                  const authToken = response.data.token
                  localStorage.setItem('token', authToken) // setting the token to localStorage
                  dispatch(setToken(authToken))
                  alert('successfully logged in')
                  window.location.reload()
                }
            })
            .catch((err) => {
                console.log('[ERROR-login]',err)
            })
    }
}

//---------------------------get user and store

export const setUser = (data) => {
  return { type: 'SET_USER', payload: data }
}

export const startGetUser = () => {
  return (dispatch) => {
    axios
      .get(`http://dct-ticket-master.herokuapp.com/users/account`,{
          headers : {
              'x-auth': getToken
          }
      })
      .then((response) => {
        console.log('[PROMISE-getUser]', response.data)
        const getUser = response.data
        dispatch(setUser(getUser))
        })
      .catch((err) => {
        console.log('[ERROR-getUser]', err)
      })
  }
}

//------------------------ logout user 

export const clrUser = () => {
  return { type: 'CLEAR_USER' }
}

export const startLogout = () => {
  return (dispatch) => {
    axios
      .delete(`http://dct-ticket-master.herokuapp.com/users/logout`, {
        headers: {
          'x-auth': getToken,
        },
      })
      .then((response) => {
        console.log('[PROMISE-logoutUser]', response.data)
        dispatch(clrUser())
        localStorage.removeItem('token')
        window.location.href='/'
      })
      .catch((err) => {
        console.log('[ERROR-logoutUser]', err)
      })
  }
}