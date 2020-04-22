import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import loginReducer from '../reducers/loginReducer'
import customersReducer from '../reducers/customersReducer'
import deptsReducer from '../reducers/deptsReducer'
import empsReducer from '../reducers/empsReducer'
import ticketsReducer from '../reducers/ticketsReducer'

const configureStore = () => {
    const store = createStore(combineReducers({
        login: loginReducer,
        customers: customersReducer,
        depts: deptsReducer,
        emps: empsReducer,
        tickets: ticketsReducer,
    }),applyMiddleware(thunk))
    return store
}

export default configureStore