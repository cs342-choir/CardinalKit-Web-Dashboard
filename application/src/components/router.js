import React from 'react'
import {BrowserRouter, Route, Switch } from 'react-router-dom'

import NotFound from '../pages/Main/notFound'
/*
 import page-or-component-name from path
 */

 const Router =()=>(
    <BrowserRouter>
        <Switch>
            {/* <Route exact path="/path" component={page-or-component-name}/> */}
            <Route component={NotFound}/>
        </Switch>
    </BrowserRouter>
 )

 export default Router