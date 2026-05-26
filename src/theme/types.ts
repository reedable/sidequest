export interface ThemeTokens {
  palette: {
    mode: 'light' | 'dark'
    primary: string
    secondary: string
    background: {
      default: string
      paper: string
    }
  }
  typography: {
    fontFamily: string
  }
  shape: {
    borderRadius: number
  }
}
