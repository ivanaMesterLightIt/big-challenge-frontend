import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { RouteGuard } from '../guards/routerGuard'

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <RouteGuard>
        <Component {...pageProps} />
        <Toaster />
      </RouteGuard>
    </QueryClientProvider>
  )
}
