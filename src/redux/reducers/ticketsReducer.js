const initialTicketState = []

const ticketsReducer = (state = initialTicketState, action) => {
    switch(action.type){
        case 'SET_TICKETS':{
            return state.concat(action.payload)
        }
        case 'ADD_TICKET':{
            return state.concat(action.payload)
        }
        case 'REMOVE_TICKET':{
            return state.filter(ele => ele._id !== action.payload)
        }
        case 'UPDATE_TICKET':{
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

export default ticketsReducer