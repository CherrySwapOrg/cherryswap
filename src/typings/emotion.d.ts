import '@emotion/react'

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      primary: string
      primaryOnDark: string
      additionalColors: Record<string, string>
      background: {
        main: string
        light: string
        dark: string
        alternativeDark: string
      }
      button: {
        background: {
          hover: string
          press: string
          disabled: string
          light: string
        }
      }
      text: {
        main: string
        dark: string
        placeholder: string
      }
      border: {
        main: string
        primaryOnDark: string
      }
    }
    borderRadius: {
      extraSmall: string
      small: string
      normal: string
      large: string
    }
    boxShadow: {
      primary: string
    }
  }
}
