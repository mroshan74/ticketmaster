import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from './App'
import configureStore from './redux/store/configuresStore'
import { startSetEmps } from './redux/actions/EmpsAction'
import { startGetDepts } from './redux/actions/deptsAction'
import { startGetCustomers } from './redux/actions/customersAction'
import { startSetTickets } from './redux/actions/ticketAction'
import { startGetUser } from './redux/actions/loginActions'

const store = configureStore()

if(localStorage.getItem('token')){
    store.dispatch(startGetUser())
    store.dispatch(startSetEmps())
    store.dispatch(startGetDepts())
    store.dispatch(startGetCustomers())
    store.dispatch(startSetTickets())
}

store.subscribe(()=>{
    console.log(store.getState())
})

const jsx = (
    <Provider store={store}>
        <App />
    </Provider>
)

ReactDOM.render(jsx,document.getElementById('root'))