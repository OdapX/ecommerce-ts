import { db } from '../firebase'
import { signIn, signOut, getSession, useSession } from 'next-auth/react'
import moment from 'moment'
import { useState } from 'react'
import Order from '../components/Order'
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
          <h1 className="mb-5 text-3xl">
            Orders ({orders ? orders?.length : 0}){' '}
          </h1>
          <hr />

          <div className="mt-7 ">
            {orders?.map((order: any) => (
              <Order
                id={order.id}
                amount={order.amount}
                shipping_amount={order.amountShipping}
                images={order.images}
                timestamp={order.timestamp}
              />
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
  const session = await getSession(context)

  try {
    const email = session?.user?.email || ''
    const OrderCollection = await db
      .collection('users')
      .doc(email)
      .collection('orders')
      .get()

    const orders = await Promise.all(
      OrderCollection.docs.map(async (order) => ({
        id: order.id,
        amount: order.data().amount / 100,
        amountShipping: order.data().shipping_amount / 100,
        images: order.data().images,
        timestamp: moment(order.data().timestamp.toDate()).unix(),
      }))
    )

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
