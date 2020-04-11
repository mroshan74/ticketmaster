const initialState = {}

export const byIdsReducer = (state = initialState, action) =>{
    switch(action.type){
        case 'SET_DEPT_BY_ID':{
            return action.payload
        }
        case 'SET_EMP_BY_ID':{
            return action.payload
        }
        default:{
            return {...state}
        }
    }
}

export default byIdsReducer