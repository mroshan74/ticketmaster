const initialEmpState = []

export const empsReducer = ( state = initialEmpState , action) => {
    switch(action.type){
        case 'SET_EMPS': {
            return state.concat(action.payload)
        }
        case 'ADD_EMP': {
            return state.concat(action.payload)
        }
        case 'DEL_EMP': {
            return state.filter(emp => emp._id !== action.payload)
        }
        case 'UPDATE_EMP': {
            return state.map(emp => {
                if(emp._id===action.payload.id){
                    return Object.assign({},emp,action.payload.data)
                }
                else{
                    return Object.assign({},emp)
                }
            })
        }
        default: {
            return [...state]
        }
    }
}

export default empsReducer