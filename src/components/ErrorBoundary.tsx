import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RotateCcw, AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in Shakti Mahotsav application:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#020817] text-[#F8F2E3] flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-[#0B1F3A]/90 border border-[#D4A84F]/40 p-8 rounded-2xl shadow-2xl backdrop-blur-md space-y-5">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#D4A84F]/20 border border-[#D4A84F] flex items-center justify-center text-[#F5D58A]">
              <AlertTriangle size={24} />
            </div>
            <h2 className="font-heading text-2xl font-bold text-[#F8F2E3]">
              Divine Renewal Needed
            </h2>
            <p className="text-sm text-[#F8F2E3]/80 font-subheading leading-relaxed">
              Something unexpected occurred while rendering the festival visual experience.
            </p>
            <button
              onClick={this.handleReset}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D4A84F] to-[#F5D58A] text-[#061426] font-manrope font-semibold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              <RotateCcw size={14} />
              <span>Reload Shakti Mahotsav</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
