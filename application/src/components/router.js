import React from 'react'
import {BrowserRouter, Route, Switch } from 'react-router-dom'

import NotFound from '../pages/Main/notFound'
import Users from '../pages/users'
/*
 import page-or-component-name from path
 */

 const Router =()=>(
    <BrowserRouter>
        <Switch>
            {/* <Route exact path="/path" component={page-or-component-name}/> */}
            <Route exact path="/users" component={Users}/>
            <Route component={NotFound}/>
        </Switch>
    </BrowserRouter>
 )

 export default Router