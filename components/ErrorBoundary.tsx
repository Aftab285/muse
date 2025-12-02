import React, { ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
          <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
            <h2 className="text-xl font-bold text-slate-900 mb-2">Something went wrong</h2>
            <p className="text-slate-500 text-sm mb-4">
                We encountered an unexpected error. Please try refreshing the page.
            </p>
            <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700"
            >
                Refresh Page
            </button>
            {this.state.error && (
                <div className="mt-6 text-left bg-slate-100 p-4 rounded-md overflow-auto max-h-40">
                    <p className="text-xs font-mono text-red-600 whitespace-pre-wrap">
                        {this.state.error.toString()}
                    </p>
                </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}