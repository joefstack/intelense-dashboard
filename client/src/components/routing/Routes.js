import React from "react";
import { Route, Switch } from "react-router-dom";
import Register from "components/auth/Register";
import Login from "components/auth/Login";
import Alert from "components/layout/Alert";
import Dashboard from "components/dashboard/Dashboard";
import NotFound from "components/layout/NotFound";
import PrivateRoute from "components/routing/PrivateRoute";

const Routes = () => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
