import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
// Pages
import * as Pages from "../pages";
// Components
import { HeaderMenu, TypedRoute } from "./components";
// Types
import { RoutePaths } from "../types/routes";

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <HeaderMenu />

      <Switch>
        <TypedRoute
          exact
          path={RoutePaths.ProductsPage}
          component={Pages.ProductsPage}
        />

        <TypedRoute
          exact
          path={RoutePaths.OrdersPage}
          component={Pages.OrdersPage}
        />
      </Switch>
    </BrowserRouter>
  );
};
