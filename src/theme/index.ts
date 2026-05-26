import { createTheme } from '@mui/material'
import type { ThemeTokens } from './types'
import grayscaleTheme from './themes/grayscale'

export function buildTheme(tokens: ThemeTokens) {
  return createTheme({
    palette: {
      mode: tokens.palette.mode,
      primary: { main: tokens.palette.primary },
      secondary: { main: tokens.palette.secondary },
      background: tokens.palette.background,
    },
    typography: {
      fontFamily: tokens.typography.fontFamily,
    },
    shape: tokens.shape,
  })
}

export default buildTheme(grayscaleTheme)
