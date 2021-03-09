import React from "react";
// Components
import { PageError } from "../../../components";

interface ErrorBoundaryState {
  hasError: boolean;
  error: any;
}

interface ErrorBoundaryProps {
  placeholder?: React.ReactNode;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error: any) {
    return {
      hasError: true,
      error,
    };
  }
  render() {
    if (this.state.hasError) {
      return (
        this.props.placeholder || (
          <PageError
            title={"Algum erro ocorreu"}
            description={"Tente novamente mais tarde"}
          />
        )
      );
    }
    return this.props.children;
  }
}
