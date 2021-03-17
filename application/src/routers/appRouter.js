import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";

import { AuthRouter } from "./authRouter";
import Loading from "../components/loading";
import { Main } from "../pages/Main/main";
import { auth } from "../components/firebase";
import { login } from "../ations/auth";
import { PrivateRoute } from "./privateRoute";
import { LoginRoute } from "./loginRoute";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.ui);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loadingUser, setLoadingUser]=useState(true)

  useEffect(() => {
    setLoadingUser(true)
    auth.onAuthStateChanged((user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        console.log("setTrue");
        setIsLoggedIn(true);
      } else {
        console.log("setFalse");
        setIsLoggedIn(false);
      }
      setLoadingUser(false)
    });
  }, [dispatch, setIsLoggedIn,setLoadingUser]);

  
  if (loadingUser || loading) {
    return(
      <Loading/>
    );
  } else {
    return (
        <Router>
          <Switch>
            <LoginRoute 
            path="/auth" 
            isAuthenticated={isLoggedIn}
            component={AuthRouter} 
            />
            <PrivateRoute
              exact
              isAuthenticated={isLoggedIn}
              path="/"
              component={Main}
            />
            <Redirect to="/auth/login" />
          </Switch>
        </Router>
    );
  }
};
