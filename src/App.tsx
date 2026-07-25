import { ThemeProvider, CssBaseline } from '@mui/material'
import { createHashRouter, RouterProvider } from 'react-router'
import theme from './theme'
import { DbProvider } from './db/DbContext'
import Index from './pages/Index'
import WorldSplitFlow from './pages/the-world-was-split-three-ways/WorldSplitFlow'
import SecretMessageFlow from './pages/send-a-secret-message/SecretMessageFlow'

const router = createHashRouter([
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '/the-world-was-split-three-ways',
    element: <WorldSplitFlow />,
  },
  {
    path: '/send-a-secret-message',
    element: <SecretMessageFlow />,
  },
])

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DbProvider>
        <RouterProvider router={router} />
      </DbProvider>
    </ThemeProvider>
  )
}
