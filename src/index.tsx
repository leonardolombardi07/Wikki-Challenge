import React from "react";
import ReactDOM from "react-dom";
// Components
import { StylesProvider } from "./styles/StylesProvider";
import { Router } from "./routes";
// Redux
import { Provider as ReduxProvider } from "react-redux";
import { AuthorizationProvider } from "./authorization";
import { store } from "./redux/store";
// Dev Tools
import LogRocket from "logrocket";

LogRocket.init("pbvwcs/carlexdev");
ReactDOM.render(
  <ReduxProvider store={store}>
    <AuthorizationProvider>
      <StylesProvider>
        <Router />
      </StylesProvider>
    </AuthorizationProvider>
  </ReduxProvider>,
  document.getElementById("root")
);
