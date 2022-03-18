import type { NextPage,GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Banner from '../components/Banner'
import Header from '../components/Header'
import ProductFeed from '../components/ProductFeed'
import {Product} from "../typings"

interface Props { 
   products : [Product]
}
const Home = ({products} : Props) => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-gray-200"> 
      <Header/>
      <Banner/>
      <ProductFeed products = { products } />
      </main>
    </>
  )
}

export default Home


export const getServerSideProps: GetServerSideProps = async () => {
         
         try{
            const res = await fetch(`${process.env.FAKE_STORE_API_URL}/products`)
             const products : [Product]   =  await res.json()
           
             return { 
              props:{
                products
              }
          }
            
           }catch(err){
            console.error(err)
            return {
               props:{
                products:[] 
              }
            }
           
           }

           
        
}