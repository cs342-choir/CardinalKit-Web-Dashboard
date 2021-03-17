import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route } from "react-router";

export const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
})=>{
    console.log("isAuthenticated",isAuthenticated);
    return(
        <Route {...rest}
        component={(props)=>(
            (isAuthenticated)
            ?(<Component{...props}/>)
            :(<Redirect to="/auth"/>)
        )}
        />
    )
}

PrivateRoute.protoTypes = {
    isAuthenticated : PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}