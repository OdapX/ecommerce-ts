import Header from '../components/Header'
import { useAppSelector, useAppDispatch } from '../Reduxstore/Hooks'
import { SelectProducts, RemoveFromBasket } from '../Reduxstore/BasketSlice'
import { Product } from './../typings'
import Currency from 'react-currency-formatter'
import { loadStripe } from '@stripe/stripe-js'
import { useSession, signIn } from 'next-auth/react'
import { useState } from 'react'
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

interface Command {
  product: Product
  quantity: number
}
function Checkout() {
  const { data: session } = useSession()
  const dispatch = useAppDispatch()
  const commands: Command[] = useAppSelector(SelectProducts)

  const RemoveItemFromBasket = (id: number) => {
    dispatch(RemoveFromBasket(id))
  }
  const createCheckoutSession = async () => {
    const stripe = await stripePromise
    const response = await fetch('/api/create-session', {
      method: 'POST',
      headers: {
        contentType: 'application/json',
      },
      body: JSON.stringify({
        commands,
        email: session?.user?.email,
      }),
    })

    const checkoutSession = await response.json()

    const result = await stripe?.redirectToCheckout({
      sessionId: checkoutSession.id,
    })

    if (result?.error) {
      alert(result.error.message)
    }
  }
  const [Spin, setSpin] = useState(false)
  return session ? (
    <main className=" grid flex-col-reverse gap-5 bg-gray-200 px-7 py-10 lg:grid-cols-5 xl:grid-cols-7  ">
      {commands.length === 0 ? (
        <div className="col-span-7 mt-10 w-full">
          <h1 className="font-sansserif text-3xl">Shopping Cart</h1>
          <div className="grid w-full grid-cols-1  place-items-center sm:grid-cols-2">
            <div className="font-sansserif rounded-md  bg-yellow-400 py-2 px-4 text-center text-xl">
              Your Cart Is Empty
            </div>
            <img src="https://m.media-amazon.com/images/G/01/cart/empty/kettle-desaturated._CB445243794_.svg" />
          </div>
        </div>
      ) : (
        <>
          <div className="flex  flex-col  space-y-2 bg-white px-10 py-5 lg:col-span-4 xl:col-span-6">
            <h1 className="font-sansserif text-3xl">Shopping Cart</h1>
            <div className="relative flex flex-row-reverse bg-white px-7">
              <p className="text-lg">Price</p>
            </div>
            <hr className="w-full bg-gray-500" />
            {commands?.map((command) => (
              <div className="p-4" key={command.product.id}>
                <div className="grid grid-cols-1 pb-2 lg:grid-cols-5">
                  <img
                    src={command.product.image}
                    alt=""
                    className="max-h-48 w-48 object-contain"
                  />
                  <div className="col-span-4">
                    <div className="flex justify-between">
                      <h1 className="font-sansserif text-2xl">
                        {command.product.title}
                      </h1>
                      <div className="text-xl font-bold">
                        <Currency quantity={command.product.price} />
                      </div>
                    </div>

                    <p className="text-md font-semibold text-green-600">
                      Quantity : {command.quantity}
                    </p>

                    <p className=" text-md mt-5 font-semibold">
                      Category : {command.product.category}
                    </p>

                    <button
                      className="font-sansserif mt-7 rounded-md bg-yellow-600 px-4 py-2 text-xl text-white"
                      onClick={() => RemoveItemFromBasket(command.product.id)}
                    >
                      Remove Item
                    </button>
                  </div>
                </div>
                <hr className="w-full bg-gray-500" />
                <div className="flex flex-row-reverse pt-4">
                  <p className="text-xl font-semibold">
                    Subtotal ({commands.length} items) :
                    <Currency
                      quantity={commands.reduce(
                        (total, item) =>
                          total + item.product.price * item.quantity,
                        0
                      )}
                    />
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="max-h-64 space-y-4 bg-white p-4">
            <div className="text-lg ">
              {' '}
              <p>Subtotal ({commands.length} items): </p>
              <span className="pl-2 text-2xl font-semibold">
                <Currency
                  quantity={commands.reduce(
                    (total, item) => total + item.product.price * item.quantity,
                    0
                  )}
                />
              </span>
            </div>
            <button
              role="link"
              type="button"
              className="text-semibold w-full rounded-md bg-yellow-400 py-3 text-sm"
              onClick={() => {
                setSpin(true)
                createCheckoutSession()
              }}
            >
              {!Spin ? (
                <p className="text-md font-semibold">PROCEED TO CHECKOUT</p>
              ) : (
                <div className="text-md flex justify-center font-semibold">
                  Processing...{' '}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={` h-6 w-6 animate-spin`}
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
                </div>
              )}
            </button>
          </div>
        </>
      )}
    </main>
  ) : (
    <div className="grid h-screen grid-cols-1 place-items-center">
      <div className="w-1/2 space-y-9  rounded-md border-2 p-9 text-center shadow-md ">
        <div>
          <h1 className="font-semi-bold text-3xl ">
            You need to sign in first{' '}
          </h1>
          <p>Once you'll log in your cart will be here</p>
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
            className={` h-6 w-6 ${Spin ? 'block animate-spin ' : 'hidden'}`}
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
  )
}

export default Checkout
