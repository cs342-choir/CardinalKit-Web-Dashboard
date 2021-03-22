import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Redirect, Route } from "react-router-dom";

import { AuthRouter } from "./authRouter";
import Loading from "../components/loading";
import { Main } from "../pages/Main/main";
import { StudyDetail } from "../pages/studies/studyDetail";
import { auth } from "../firebase/firebase";
import { fethUserPermissions, login } from "../actions/auth";
import { PrivateRoute } from "./privateRoute";
import { LoginRoute } from "./loginRoute";
import { RegisterScreen } from "../pages/Main/Register";
import { LoginLinkScreen } from "../pages/Main/LoginLink";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.ui);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    setLoadingUser(true);
    auth.onAuthStateChanged((user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        dispatch(fethUserPermissions(user.uid));
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setLoadingUser(false);
    });
  }, [dispatch, setIsLoggedIn, setLoadingUser]);

  if (loadingUser || loading) {
    return <Loading />;
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
          <PrivateRoute
            exact
            isAuthenticated={isLoggedIn}
            path="/study/:id"
            component={StudyDetail}
          />

          <PrivateRoute
            exact
            isAuthenticated={isLoggedIn}
            path="/register"
            component={RegisterScreen}
          />

          <Route
            exact
            path="/LoginLink"
            component={LoginLinkScreen}
          />

          <Redirect to="/auth/login" />
        </Switch>
      </Router>
    );
  }
};
