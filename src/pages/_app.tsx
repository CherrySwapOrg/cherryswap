import { FC } from 'react'

import 'lib/dayjs'
import { css, ThemeProvider, Global } from '@emotion/react'
import { Plus_Jakarta_Sans } from '@next/font/google'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import store, { persistor } from 'app/store'
import theme from 'app/theme'

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'] })

const MyApp: FC<AppProps> = ({ Component, pageProps }) => (
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Global
          styles={css`
            /* Box sizing rules */
            *,
            *::before,
            *::after {
              box-sizing: border-box;
              text-decoration: none;
              list-style: none;
              margin: 0;
              padding: 0;
            }

            /* Set core body defaults */
            body {
              font-family: ${plusJakartaSans.style.fontFamily}, sans-serif;
              min-height: 100vh;
              scroll-behavior: smooth;
              text-rendering: optimizeSpeed;
              line-height: 1.5;
              background: ${theme.colors.background.main};
            }

            /* Make images easier to work with */
            img {
              max-width: 100%;
              display: block;
            }

            /* Inherit fonts for inputs and buttons */
            input,
            button,
            textarea,
            select {
              font: inherit;
            }
          `}
        />
        <Head>
          <title>Cherry Swap - Instant Crypto Exchanges</title>
          <meta
            name='description'
            content='Fast and unlimited swaps between 500+ cryptocurrencies. Fully non-custodial.'
          />
        </Head>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  </ThemeProvider>
)

export default MyApp
