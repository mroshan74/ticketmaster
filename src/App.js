import React from 'react'
import { BrowserRouter , Route } from 'react-router-dom'

import Login from './components/layouts/Login'
import Register from './components/layouts/Register'
import Home from './components/layouts/Home'
import Navbar from './components/general/Navbar'
import Customers from './components/customers/Customers'
import CustomerNew from './components/customers/CustomerNew'
import CustomerEdit from './components/customers/CustomerEdit'
import ShowCustomer from './components/customers/ShowCustomer'

function App(props){
    return (
      <BrowserRouter>
        <div>
          <Navbar />

          <Route exact path={'/'} component={Home} />
          <Route exact path={'/login'} component={Login} />
          <Route exact path={'/register'} component={Register} />
          <Route exact path={'/customers'} component={Customers} />
          <Route exact path={'/customer/new'} component={CustomerNew} />
          <Route exact path={'/customer/:id'} component={ShowCustomer} />
          <Route exact path={'/customer/edit/:id'} component={CustomerEdit} />
        </div>
      </BrowserRouter>
    )
}

export default App