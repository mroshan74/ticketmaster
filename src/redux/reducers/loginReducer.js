const initialLoginState = {
    token: '' || localStorage.getItem('token'),
    username:'',
    email:''
}

const loginReducer = (state = initialLoginState, action) => {
     switch(action.type) {
         case 'SET_TOKEN': {
             return Object.assign({},state,{token:action.payload})
         }
         case 'SET_USER': {
             return Object.assign({},state,{
                 username: action.payload.username,
                 email: action.payload.email
             })
         }
         case 'CLEAR_USER': {
             return Object.assign({}, state, {
               token: '' ,
               username: '',
               email: '',
             })
         }
         default: {
             return {...state}
         }   
    }
}
export default  loginReducer