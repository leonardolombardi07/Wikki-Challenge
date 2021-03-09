import React from "react";
// Components
import { Redirect } from "react-router-dom";
import { TypedRoute } from "../TypedRoute";
// Redux
import { useSelector } from "../../../redux";
import { selectIsAuthenticated } from "../../../redux/auth";
// Types
import { RoutePaths } from "../../../types/routes";
import { TypedRouteProps } from "../TypedRoute";

export const PrivateRoute: React.FC<TypedRouteProps> = (props) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return isAuthenticated ? (
    <TypedRoute {...props} />
  ) : (
    <Redirect
      to={{
        pathname: RoutePaths.ProductsPage,
        state: { from: props.location },
      }}
    />
  );
};
