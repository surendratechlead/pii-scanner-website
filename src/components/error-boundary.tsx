'use client'

import { Component, type ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Something went wrong</h2>
            <p className="text-muted-foreground">An unexpected error occurred. Please refresh the page.</p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="text-emerald-600 hover:underline"
            >
              Try again
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
