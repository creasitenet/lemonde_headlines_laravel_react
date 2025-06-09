import { Component, ErrorInfo, ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex items-center justify-center px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Oops, quelque chose s'est mal passé !
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              {this.state.error?.message || 'Une erreur inattendue est survenue.'}
            </p>
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Retour à l'accueil
            </Link>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary 