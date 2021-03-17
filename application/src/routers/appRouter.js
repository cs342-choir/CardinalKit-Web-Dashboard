import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { AuthRouter } from "./authRouter";
import Loading from "../components/loading";

export const AppRouter = () => {
  const { loading } = useSelector((state) => state.ui);
  return (
    <Loading loading={loading}>
      <Router>
        <div>
          <Switch>
            <Route path="/auth" component={AuthRouter} />

            {/* <Route 
                        exact
                        path="/"
                        // component={ JournalScreen }
                    /> */}

            <Redirect to="/auth/login" />
          </Switch>
        </div>
      </Router>
    </Loading>
  );
};
