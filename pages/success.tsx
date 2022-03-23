import { useRouter } from 'next/router'
function sucess() {
  const router = useRouter()
  return (
    <div className="grid h-screen  grid-cols-1 place-items-center ">
      <div className="space-y-10 bg-gray-100 p-10">
        <div>
          <h1 className="text-3xl font-semibold">
            Your order has been placed successfully !
          </h1>
          <p className="text-sm text-gray-600">
            You can go to your orders to track your purchases
          </p>
        </div>
        <button
          className="w-full rounded-md bg-yellow-400 py-2 text-lg font-semibold transition duration-100 hover:bg-yellow-500"
          onClick={() => router.push('/Orders')}
        >
          See Your Orders
        </button>
      </div>
    </div>
  )
}

export default sucess
