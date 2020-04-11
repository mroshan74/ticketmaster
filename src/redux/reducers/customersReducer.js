const initialStateCustomers = []


const customersReducer = ( state = initialStateCustomers, action ) => {
    switch(action.type){
        case 'SET_GET_CUSTOMER': {
            return state.concat(action.payload)
        }
        case 'SET_NEW_CUSTOMER': {
            return state.concat(action.payload)
        }
        case 'SET_EDIT_CUSTOMER': {
            return state.map(ele=>{
                if(ele._id===action.payload.id){
                    return Object.assign({},ele,action.payload.data)
                }
                else{
                    return Object.assign({},ele)
                }
            })
        }
        case 'DELETE_CUSTOMER':{
            return state.filter(ele => ele._id !== action.payload) 
            }
        default: {
            return [...state]
        }
    }
}
export default customersReducer