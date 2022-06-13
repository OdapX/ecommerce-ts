import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { Provider } from 'react-redux'
import { store } from '../Reduxstore/store'
import Layout from '../components/Layout'
import { ToastContainer, Zoom } from 'react-toastify'
function MyApp({ Component , pageProps: { session, ...pageProps } }: any ) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
          <ToastContainer transition={Zoom} className="mt-12 -mr-4" />
        </Layout>
      </Provider>
    </SessionProvider>
  )
}

export default MyApp
