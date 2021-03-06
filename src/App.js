import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import './styles.css'

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
import EmpHome from './components/employees/EmpHome'
import EmpNew from './components/employees/EmpNew'
import EmpShow from './components/employees/EmpShow'
import EmpEdit from './components/employees/EmpEdit'
import tickHome from './components/ticket/tickHome'
import TickNew from './components/ticket/TickNew'
import TickShow from './components/ticket/TickShow'
import tickEdit from './components/ticket/tickEdit'

function App(props) {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Switch>
          <Route exact path={'/'} component={Home} />
          <Route path={'/login'} component={Login} />
          <Route path={'/register'} component={Register} />

          <Route path={'/customers'} component={Customers} />
          <Route path={'/customer/new/'} component={CustomerNew} />
          <Route exact path={'/customer/:id'} component={ShowCustomer} />
          <Route path={'/customer/edit/:id'} component={CustomerEdit} exact={true} />

          <Route exact path={'/departments'} component={Depts} />
          <Route exact path={'/departments/:id'} component={ShowDept} />
          <Route path={'/departments/edit/:id'} component={DeptEdit} />

          <Route path={'/employee/new'} component={EmpNew} />
          <Route path={'/employees'} component={EmpHome} />
          <Route exact path={'/employee/:id'} component={EmpShow} />
          <Route exact path={'/employee/edit/:id'} component={EmpEdit} />

          <Route path={'/tickets'} component={tickHome} />
          <Route path={'/ticket/new'} component={TickNew} />
          <Route exact path={'/ticket/:id'} component={TickShow} />
          <Route exact path={'/ticket/edit/:id'} component={tickEdit} />
          
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
