import { ThemeProvider, CssBaseline } from '@mui/material'
import { createHashRouter, RouterProvider, Navigate } from 'react-router'
import theme from './theme'
import { DbProvider } from './db/DbContext'
import WorldSplitFlow from './pages/the-world-was-split-three-ways/WorldSplitFlow'

const router = createHashRouter([
  {
    path: '/',
    element: <Navigate to="/the-world-was-split-three-ways" replace />,
  },
  {
    path: '/the-world-was-split-three-ways',
    element: <WorldSplitFlow />,
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
