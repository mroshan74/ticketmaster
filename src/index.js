import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from './App'
import configureStore from './redux/store/configuresStore'
import { startSetEmps } from './redux/actions/EmpsAction'
import { startGetDepts } from './redux/actions/deptsAction'
import { startGetCustomers } from './redux/actions/customersAction'

const store = configureStore()

store.dispatch(startSetEmps())
store.dispatch(startGetDepts())
store.dispatch(startGetCustomers())

store.subscribe(()=>{
    console.log(store.getState())
})

const jsx = (
    <Provider store={store}>
        <App />
    </Provider>
)

ReactDOM.render(jsx,document.getElementById('root'))