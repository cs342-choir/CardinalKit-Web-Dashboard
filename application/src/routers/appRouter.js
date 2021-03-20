import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

import { AuthRouter } from "./authRouter";
import Loading from "../components/loading";
import { Main } from "../pages/Main/main";
import { StudyDetail } from "../pages/studies/studyDetail";
import { auth } from "../firebase/firebase";
import { fethUserPermissions, login } from "../actions/auth";
import { PrivateRoute } from "./privateRoute";
import { LoginRoute } from "./loginRoute";
// import { fetchStudies } from "../actions/studies";

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
        dispatch(fethUserPermissions(user.uid))
        // dispatch(fetchStudies());
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
          <Redirect to="/auth/login" />
        </Switch>
      </Router>
    );
  }
};
