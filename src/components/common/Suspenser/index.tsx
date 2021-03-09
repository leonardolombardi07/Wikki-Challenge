import React from "react";
// Components
import { ErrorBoundary } from "../../../components";

interface SuspenserProps {
  condition: boolean;
  loadingPlaceholder: React.ReactNode;
  errorBoundaryPlaceholder?: React.ReactNode;
}

export const Suspenser: React.FunctionComponent<SuspenserProps> = ({
  condition,
  loadingPlaceholder: LoadingPlaceholder,
  errorBoundaryPlaceholder: ErrorPlaceholder,
  children,
}) => {
  return (
    <ErrorBoundary placeholder={ErrorPlaceholder}>
      {condition ? LoadingPlaceholder : children}
    </ErrorBoundary>
  );
};
