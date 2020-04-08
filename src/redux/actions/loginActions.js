import axios from 'axios'

export const setToken = (authToken) => {
    return { type : 'SET_TOKEN', payload: authToken }
}

export const startLogin = (loginData) =>{
    return (dispatch) => {
        axios.post(`http://dct-ticket-master.herokuapp.com/users/login`,loginData)
            .then((response) => {
                console.log('[PROMISE-login]', response.data)
                if(response.data.hasOwnProperty('error')){
                    alert('invalid username/password')
                }
                else{
                    const authToken = response.data.token
                    dispatch(setToken(authToken))
                }
            })
            .catch((err) => {
                console.log('[ERROR-login]',err)
            })
    }
}