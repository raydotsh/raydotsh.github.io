import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: "40px 20px",
            textAlign: "center",
            fontFamily: "sans-serif",
            color: "#191816",
            background: "#f4f0e8",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h2>Something went wrong loading this section.</h2>
          <p style={{ opacity: 0.8, maxWidth: "400px", margin: "16px 0" }}>
            Please refresh the page or return to the main section.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "12px 24px",
              background: "#191816",
              color: "#f4f0e8",
              border: "none",
              borderRadius: "99px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
