import {  GetServerSideProps } from 'next'
import {Product} from "../typings"
import Item from "./Item"
interface Props { 
   products:[Product]
}
function ProductFeed( {products } : Props) {
  return (
    <div className="md:max-w-screen-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 -translate-y-5 xl:-translate-y-64 px-10"> 
    {products?.map(product =>(<Item product={product} key={product.id}/>
      
    
  ))}
   </div>
  )
}

export default ProductFeed

