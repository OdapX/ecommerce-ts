import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import { SelectProducts } from '../Reduxstore/BasketSlice'
import { useAppSelector } from '../Reduxstore/Hooks'
import { useRouter } from 'next/router'
function Header() {
  const Items = useAppSelector(SelectProducts)
  const { data: session } = useSession()
  const router = useRouter()
  return (
    <div className="sticky top-0 z-20 bg-[#121923] px-4 pb-2  lg:pb-0  ">
      <div className=" flex  items-center justify-between space-x-5 py-2">
        <div
          className="cursor-pointer text-3xl font-semibold text-white"
          onClick={() => router.push('/')}
        >
          ESTORE
        </div>
        <div className="group relative  hidden h-9 flex-grow  space-x-2 rounded-lg focus:ring focus:ring-green-600 lg:flex">
          <input
            type="text"
            className="flex flex-shrink flex-grow rounded-lg  p-2 focus:outline-none focus:ring focus:ring-yellow-400"
          />
          <div className="absolute right-0 h-full cursor-pointer  rounded-r-lg bg-yellow-500 p-2 px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <div className="flex items-center space-x-9 text-white">
          {session ? (
            <div className="hidden cursor-pointer border border-[#121923] p-1 hover:border-white lg:block">
              <p className="text-sm ">Signed in as {session?.user?.name} </p>
              <button
                className="text-sm font-semibold lg:text-lg"
                onClick={() => signOut()}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden cursor-pointer border border-[#121923] p-1 hover:border-white lg:block">
              <p className="text-sm "> Not signed in</p>
              <button
                className="text-sm font-bold lg:text-lg"
                onClick={() => signIn()}
              >
                Accounts and lists
              </button>
            </div>
          )}

          <div
            className="hidden cursor-pointer border border-[#121923] p-1 hover:border-white lg:block"
            onClick={() => router.push('/Orders')}
          >
            <p className="text-sm ">Check your orders </p>
            <p className="text-sm font-semibold lg:text-lg">Orders</p>
          </div>
          <div className="block  lg:hidden">
            <p className="text-lg ">Login</p>
          </div>

          <div
            className="flex cursor-pointer items-center space-x-2 border border-[#121923] py-2 px-1 hover:border-white "
            onClick={() => router.push('/Checkout')}
          >
            <div className="relative  ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="absolute -top-1 -right-1 rounded-full bg-yellow-400 px-1 text-xs font-bold text-black">
                {Items.length || 0}
              </span>
            </div>
            <p className="hidden font-semibold lg:flex">Basket</p>
          </div>
        </div>
      </div>
      <div className="relative flex  flex-grow space-x-2   rounded-lg  focus:ring focus:ring-green-600 lg:hidden">
        <input
          type="text"
          className="flex h-8 flex-shrink flex-grow rounded-lg   focus:outline-none focus:ring focus:ring-yellow-400"
        />
        <div className="absolute right-0 h-full cursor-pointer  rounded-r-lg bg-yellow-500 p-2 px-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default Header
