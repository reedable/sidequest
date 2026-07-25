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
    components: {
      MuiTypography: {
        styleOverrides: {
          // MUI ships 0.35em, which reads too tight at lesson prose sizes.
          gutterBottom: {
            marginBottom: '1rem',
          },
        },
      },
    },
  })
}

export default buildTheme(grayscaleTheme)
