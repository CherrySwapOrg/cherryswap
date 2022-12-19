import { Theme } from '@emotion/react'

const theme: Theme = {
  colors: {
    primary: '#bc244a',
    primaryOnDark: '#f9ebef',
    additionalColors: {
      green: '#24bc98',
    },
    background: {
      main: '#f9ebef',
      light: '#ffffff',
      dark: '#272324',
      alternativeDark: '#433a3c',
    },
    button: {
      background: {
        hover: '#81233d',
        press: '#621c2f',
        disabled: '#bc244a',
        light: 'rgba(153, 110, 119, 0.2)',
      },
    },
    text: {
      main: '#ffffff',
      dark: '#272324',
      placeholder: '#996E77',
    },
    border: {
      main: 'rgba(153, 110, 119, 0.4)',
      primaryOnDark: '#cf4568',
    },
  },
  borderRadius: {
    extraSmall: '4px',
    small: '8px',
    normal: '12px',
    large: '20px',
  },
  boxShadow: {
    primary: '10px 16px 80px rgba(156, 46, 73, 0.36);',
  },
}

export default theme
