import { db } from '../firebase'
import { signIn, signOut, getSession, useSession } from 'next-auth/react'
import moment from 'moment'
import Currency from 'react-currency-formatter'
import { useState } from 'react'
interface Props {
  orders: any
}

function Orders({ orders }: Props) {
  const { data: session } = useSession()
  const [Spin, setSpin] = useState(false)
  return (
    <div className="">
      {session?.user ? (
        <main className="mx-auto max-w-screen-2xl p-7">
          <h1 className="mb-5 text-3xl">Orders </h1>
          <hr />

          <div className="mt-7 ">
            {orders.map((order: any) => (
              <div>
                <div className="mb-10 flex items-center justify-between space-y-10  px-5">
                  <div className="flex space-x-2 ">
                    {order.images.map((image: any) => (
                      <img
                        src={image}
                        className="flex h-16 w-16 space-x-2 object-contain"
                      />
                    ))}
                  </div>
                  <div className=" text-lg">
                    <div className="flex">
                      <p>Total Price : </p>
                      <Currency quantity={order.amount} />
                    </div>
                    <div className="flex text-sm">
                      <p>Shipping Amount : </p>
                      <Currency quantity={order.amountShipping} />
                    </div>
                  </div>
                </div>
                <hr />
              </div>
            ))}
          </div>
        </main>
      ) : (
        <div className="grid h-screen grid-cols-1 place-items-center">
          <div className="w-1/2 space-y-9  rounded-md border-2 p-9 text-center shadow-md ">
            <div>
              <h1 className="font-semi-bold text-3xl ">
                You need to sign in first{' '}
              </h1>
              <p>
                Once you'll log in your orders will be registered here for you
              </p>
            </div>

            <button
              className="group flex w-full items-center justify-center  rounded-md bg-yellow-500 px-5 py-4 text-xl font-bold transition duration-500 ease-in-out hover:bg-yellow-600 "
              onClick={() => {
                setSpin(true)
                signIn()
              }}
            >
              <p>Sign in </p>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={` h-6 w-6 ${
                  Spin ? 'block animate-spin ' : 'hidden'
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Orders

export async function getServerSideProps(context: any) {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
  const session = await getSession(context)

  try {
    const OrderCollection = await db
      .collection('users')
      .doc(session?.user?.email)
      .collection('orders')
      .get()

    const orders = await Promise.all(
      OrderCollection.docs.map(async (order) => ({
        id: order.id,
        amount: order.data().amount,
        amountShipping: order.data().shipping_amount,
        images: order.data().images,
        timestamp: moment(order.data().timestamp.toDate()).unix(),
        items: (
          await stripe.checkout.sessions.listLineItems(order.id, {
            limit: 100,
          })
        ).data,
      }))
    )
    console.log(orders)
    return {
      props: {
        orders,
        session,
      },
    }
  } catch (err) {
    console.log(err)
    return {
      props: {},
    }
  }
}
