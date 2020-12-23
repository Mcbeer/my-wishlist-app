import React, { ReactNode } from "react";
import "./Application.css";
import { Provider, useSelector } from "react-redux";
import { store } from "./store/store";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteProps,
  Redirect,
} from "react-router-dom";
import { Login } from "./components/Login/Login";
import { App } from "./components/App/App";
import { StoreModel } from "./models/Store";

function Application() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <AuthenticatedRoute exact path="/app" component={App} />
          <Route exact path="/" render={() => <Redirect to="/app" />} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default Application;

const AuthenticatedRoute = ({ exact = true, path, component }: RouteProps) => {
  const user = useSelector((state: StoreModel) => state.user);

  if (user) {
    return <Route exact path={path} component={component} />;
  } else {
    return <Redirect to="/login" />;
  }
};
