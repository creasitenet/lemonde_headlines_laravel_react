import './bootstrap'
import '../css/app.css'
import React, { FC } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Layout from '@/components/Layout'
import Loading from '@/components/Loading'
import ErrorBoundary from '@/components/ErrorBoundary'
import { lazy } from 'react'
import { createRoot } from 'react-dom/client'

// Types pour les pages
type PageComponent = React.LazyExoticComponent<FC>

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
})

// Lazy loading des pages
const Home: PageComponent = lazy(() => import('./pages/Home'))
const Article: PageComponent = lazy(() => import('./pages/Article'))

const App: FC = () => {
  return (
    <ErrorBoundary>
      <Layout>
        <React.Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/article/:slug" element={<Article />} />
          </Routes>
        </React.Suspense>
      </Layout>
    </ErrorBoundary>
  )
}

const container = document.getElementById('app')
if (!container) throw new Error('Failed to find the root element')

const root = createRoot(container)

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
)

export default App 