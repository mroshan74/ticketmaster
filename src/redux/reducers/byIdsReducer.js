const initialState = {}

export const byIdsReducer = (state = initialState, action) =>{
    switch(action.type){
        case 'SET_DEPT_BY_ID':{
            return Object.assign({},state,action.payload)
        }
        default:{
            return {...state}
        }
    }
}

export default byIdsReducer