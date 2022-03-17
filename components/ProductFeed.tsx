import {  GetServerSideProps } from 'next'
import {Product} from "../typings"
import Item from "./Item"
interface Props { 
   products:[Product]
}
function ProductFeed( {products } : Props) {
  return (
    <div className="max-w-screen-2xl mx-auto grid grid-cols-3 gap-4 -translate-y-64 px-10"> 
    {products?.map(product =>(<Item product={product} key={product.id}/>
      
    
  ))}
   </div>
  )
}

export default ProductFeed

