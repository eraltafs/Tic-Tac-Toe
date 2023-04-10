import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// error handling function
function ErrorFallback(props) {
  const navigate = useNavigate();

  return (
    <div style={{ color: "white", margin:"auto", width:"60%", justifyContent:"center", alignItems:"center"}}>
      <h1>Something went wrong</h1>
      <div>
        <h3>Navigate to homepage</h3>
        <button onClick={() => navigate("/")}>Home</button>
      </div>
    </div>
  );
}


// class for handle the error
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // log the error to a service like Sentry or Rollbar
    console.error("Error caught by error boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // render a fallback UI here
      return <ErrorFallback />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
