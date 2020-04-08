import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import loginReducer from '../reducers/loginReducer'
import customersReducer from '../reducers/customersReducer'

const configureStore = () => {
    const store = createStore(combineReducers({
        login: loginReducer,
        customers: customersReducer
    }),applyMiddleware(thunk))
    return store
}

export default configureStore