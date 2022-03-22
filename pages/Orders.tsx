import {db} from "../firebase"
import { useSession,getSession} from "next-auth/react"
import moment from "moment"


function Orders({orders}) {
    
  return (
      <div>d</div>
  )
}

export default Orders

export async function getServerSideProps(context : any){
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
    const  session = await getSession(context);
    
    const OrderCollection = await  db.collection("users").doc(session?.user?.email).collection("orders").get()
   
    const orders =await  Promise.all(OrderCollection.docs.map(async (order) =>({
             id : order.id,
             amount : order.data().amount,
             amountShipping : order.data().shipping_amount,
             images : order.data().images,
             timestamp:moment(order.data().timestamp.toDate()).unix(),
             items:(
                 await stripe.checkout.sessions.listLineItems(order.id,{
                     limit:100
                 })

             ).data
     })))
    
   return {
       props:{
          orders
       }
   }

}