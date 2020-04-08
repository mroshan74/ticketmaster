const initialLoginState = ''

const loginReducer = (state = initialLoginState, action) => {
     switch(action.type) {
         case 'SET_TOKEN': {
             return state=action.payload
         }
         default: {
             return state
         }   
    }
}
export default  loginReducer