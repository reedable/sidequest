import type { ThemeTokens } from '../types'

const grayscaleTheme: ThemeTokens = {
  palette: {
    mode: 'light',
    primary: '#212121',
    secondary: '#757575',
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
  },
  shape: {
    borderRadius: 4,
  },
}

export default grayscaleTheme
