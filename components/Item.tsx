import {Product} from "../typings"
import Currency from "react-currency-formatter"
import {SelectProducts,AddToBasket, RemoveFromBasket} from "../Reduxstore/BasketSlice"
import { useAppSelector, useAppDispatch } from '../Reduxstore/Hooks'
import {useRouter} from "next/router"
interface Props {
     product : Product
}
export default function Item({product} : Props) {
   const router = useRouter()
    const dispatch = useAppDispatch()
  
  const AddIemToBasket = ()=>{
        dispatch(AddToBasket({product,quantity : 1}))   
  }
  const RemoveItemFromBasket = ()=>{
    dispatch(RemoveFromBasket(product.id))
  }
  return (
    <div className="flex flex-col  shadow bg-white space-y-3 overflow-hidden p-3 group cursor-pointer" >
        <div onClick={() => router.push(`/products/${product.id}`)} > 
        <img loading="lazy" src={product.image} alt="" className="object-contain flex justify-center h-72 w-full transition-transform duration-500 ease-in-out hover:scale-105" />
        <div className="px-5 space-y-2">
          <p className="font-semibold text-xl">{product.title}</p>
           <span className="flex">
            { Array(Math.floor(product.rating.rate)).fill(null).map((_,index)=>(
               <svg xmlns="http://www.w3.org/2000/svg" key={index} className="h-7 w-7 " viewBox="0 0 20 20" fill="#F4D100"> <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /> </svg>
            ))}
          </span>
          <p className="max-h-16 overflow-hidden text-lg line-clamp-2">{product.description}</p>
          <div className="font-semibold text-2xl"> 
          <Currency  quantity={product.price} />
          </div>
        </div> 
        </div>
        <div className=""> 
          <button className="w-full py-2 " onClick={AddIemToBasket}>ADD TO BASKET</button>
           <button className="w-full py-2 " onClick={RemoveItemFromBasket}>REMOVE TO BASKET</button>
          </div>
    </div>
  )
}
