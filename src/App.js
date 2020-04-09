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
import Depts from './components/departments/Depts'
import ShowDept from './components/departments/ShowDept'
import DeptEdit from './components/departments/DeptEdit'

function App(props){
    return (
      <BrowserRouter>
        <div>
          <Navbar />

          <Route exact path={'/'} component={Home} />
          <Route path={'/login'} component={Login} />
          <Route path={'/register'} component={Register} />

          <Route path={'/customers'} component={Customers} />
          <Route path={'/customer/new'} component={CustomerNew} />
          <Route path={'/customer/edit/:id'} component={CustomerEdit} />
          <Route path={'/customer/:id'} component={ShowCustomer} />

          <Route exact path={'/departments'} component={Depts} />
          <Route exact path={'/departments/:id'} component={ShowDept} />
          <Route path={'/departments/edit/:id'} component={DeptEdit} />
        </div>
      </BrowserRouter>
    )
}

export default App