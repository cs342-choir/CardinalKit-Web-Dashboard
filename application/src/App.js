import React from "react";
import { Provider } from "react-redux";
import { AppRouter } from "./routers/appRouter";
import { store } from "./store/store";


export const App = () => {
  return (
    <Provider store={store}>
        <AppRouter />
    </Provider>
  );
};
