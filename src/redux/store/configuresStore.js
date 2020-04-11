import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import loginReducer from '../reducers/loginReducer'
import customersReducer from '../reducers/customersReducer'
import deptsReducer from '../reducers/deptsReducer'
//import byIdsReducer from '../reducers/byIdsReducer'
import empsReducer from '../reducers/empsReducer'

const configureStore = () => {
    const store = createStore(combineReducers({
        login: loginReducer,
        customers: customersReducer,
        depts: deptsReducer,
        emps: empsReducer,
        // byIds: byIdsReducer
    }),applyMiddleware(thunk))
    return store
}

export default configureStore