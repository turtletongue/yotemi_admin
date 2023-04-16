import { Component, ReactNode } from "react";

import Error from "@pages/error";

class ErrorBoundary extends Component<{ children: ReactNode }> {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <Error />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
