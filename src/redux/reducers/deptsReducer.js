const initialStateDepts = [] 

export const deptsReducer = (state = initialStateDepts , action ) => {
    switch(action.type){
        case 'SET_DEPTS':{
            return state.concat(action.payload)
        }
        case 'ADD_DEPT':{
            return state.concat(action.payload)
        }
        case 'DELETE_DEPT':{
            return state.filter(ele => ele._id!==action.payload)
        }
        case 'EDIT_DEPT':{
            return state.map(ele => {
                if(ele._id===action.payload.id){
                    return Object.assign({},ele,action.payload.data)
                }
                else{
                    return Object.assign({},ele)
                }
            })
        }
        default:{
            return [...state]
        }
    }
}
export default deptsReducer