import Header from "../components/Header"
import {useAppSelector, useAppDispatch} from "../Reduxstore/Hooks"
import {SelectProducts,RemoveFromBasket} from "../Reduxstore/BasketSlice"
import {Product} from "./../typings"
import Currency from "react-currency-formatter"
import { loadStripe } from "@stripe/stripe-js"
const stripePromise = loadStripe(process.env.stripe_public_key)
const createCheckoutSession = async ()=>{
    const stripe = await stripePromise
}
interface Command {
      product : Product,
      quantity:number

}
function Checkout() {
    const dispatch = useAppDispatch()
    const commands : Command[]= useAppSelector(SelectProducts)
    
    const RemoveItemFromBasket = (id:number)=> {
      
        dispatch(RemoveFromBasket(id))
    }
  return (
   
  
    <main className=" bg-gray-200 px-7 py-10 grid flex-col-reverse lg:grid-cols-5 xl:grid-cols-7 gap-5  ">
        { commands.length === 0 ? <div></div> : 
        
        
         ( <> 
              <div className="space-y-2  bg-white  lg:col-span-4 xl:col-span-6 flex flex-col px-10 py-5">
           <h1 className="text-3xl font-sansserif">Shopping Cart</h1>
           <div className="relative flex flex-row-reverse bg-white px-7">
                 <p className="text-lg" >Price</p>
           </div>
           <hr className="w-full bg-gray-500" />
           { commands?.map(command =>(
               <div className="p-4" key={command.product.id}>  
               <div className="grid grid-cols-1 lg:grid-cols-5 pb-2">
               <img src={command.product.image} alt="" className="max-h-48 object-contain w-48"/>
                <div className="col-span-4">
                    <div className="flex justify-between"> 
                      <h1 className="text-2xl font-sansserif">{command.product.title}</h1>
                      <div className="font-bold text-xl">
              <Currency  quantity={command.product.price}/>
                      </div>
                     
                    </div>
                    
                    <p className="text-green-600 text-md font-semibold">Quantity : {command.quantity}</p>

                    <p className=" text-md font-semibold mt-5">Category : {command.product.category}</p>

                    <button className="bg-yellow-600 text-white mt-7 px-4 py-2 rounded-md text-xl font-sansserif" onClick={() => RemoveItemFromBasket(command.product.id)}>Remove Item</button>
                </div>
               </div>
               <hr className="w-full bg-gray-500" />
               <div className="flex flex-row-reverse pt-4">
                   <p className="font-semibold text-xl">Subtotal ({commands.length} items) : 
                   
                   <Currency  quantity={commands.reduce((total,item)=>(total+(item.product.price*item.quantity)),0)} /> 
                   
                   </p>
               </div>
          </div>
           ))}
           
       </div>
       <div className="bg-white p-4 space-y-4 max-h-64">
          <div className="text-lg "> <p>Subtotal ({commands.length} items):   </p>
                <span className="font-semibold text-2xl pl-2">
                <Currency  quantity={commands.reduce((total,item)=>(total+(item.product.price*item.quantity)),0)} />        
                 </span>
         </div>
         <button role="link" type="button" className="bg-yellow-400 text-semibold text-sm rounded-md w-full py-3">PROCEED TO CHECKOUT</button>
       </div>
       </>
         )
        }
      
     
    </main>
    
  )
}

export default Checkout