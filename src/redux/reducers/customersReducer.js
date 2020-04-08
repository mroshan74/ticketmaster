const initialStateCustomers = {
    array: [],
    single: {}
}


const customersReducer = ( state = initialStateCustomers, action ) => {
    switch(action.type){
        case 'SET_NEW_CUSTOMER': {
            return Object.assign({}, state, {
                array: state.array.concat(action.payload)
            })
        }
        case 'SET_GET_CUSTOMER': {
            return Object.assign({}, state, {
                array: state.array.concat(action.payload)
            })
        }
        case 'SET_SINGLE_CUSTOMER':{
            return Object.assign({}, state, {
                single: Object.assign({},state.single,action.payload)
            })
        }
        case 'SET_EDIT_CUSTOMER':{
            return Object.assign({},state,{
                array: state.array.map(ele => {
                    if(ele._id===action.payload.id){
                        return(Object.assign({},ele,action.payload.data))
                    }
                    else{
                        return(Object.assign({},ele))
                    }
                })
            })
        }
        case 'DELETE_CUSTOMER':{
            return Object.assign({},state,{
                array: state.array.filter(ele => ele._id !== action.payload)
                })
            }
        default: {
            return {...state}
        }
    }
}
export default customersReducer