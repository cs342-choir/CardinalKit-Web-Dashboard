import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route } from "react-router";

export const LoginRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
})=>{
    return(
        <Route {...rest}
        component={(props)=>(
            (!isAuthenticated)
            ?(<Component{...props}/>)
            :(<Redirect to="/"/>)
        )}
        />
    )
}

LoginRoute.protoTypes = {
    isAuthenticated : PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}