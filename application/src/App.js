import React from "react";
import { Provider, useSelector } from "react-redux";
import { AppRouter } from "./routers/appRouter";
import { store } from "./store/store";
import Loading from "./components/loading";


export const App = () => {
    // const {loading} = useSelector(state=> state.ui)
  return (
    <Provider store={store}>
      {/* <Loading loading = { loading }> */}
        <AppRouter />
      {/* </Loading> */}
    </Provider>
  );
};
