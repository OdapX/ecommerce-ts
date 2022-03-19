import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { Provider  } from 'react-redux'
import {store} from "../Reduxstore/store"
import Layout from '../components/Layout'

function MyApp({ Component, pageProps : { session, ...pageProps } }: AppProps) {
  return (<SessionProvider session={session}> 
  <Provider store={store}> 
   <Layout> 
   <Component {...pageProps} />
   </Layout>
   </Provider>
  </SessionProvider>)
}

export default MyApp
