import React from "react";
// Components
import { Route } from "react-router-dom";
// Types
import { RouteProps } from "react-router-dom";
import { RoutePaths } from "../../../types/routes";

export interface TypedRouteProps extends RouteProps {
  path: RoutePaths;
}

export const TypedRoute: React.FC<TypedRouteProps> = (props) => {
  return <Route {...props} />;
};
