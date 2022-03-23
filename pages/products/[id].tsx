import { GetServerSideProps } from 'next'
import { Product } from './../../typings'
import Currency from 'react-currency-formatter'
import { useState } from 'react'
import Item from '../../components/Item'
import { useAppDispatch } from '../../Reduxstore/Hooks'
import { AddToBasket } from '../../Reduxstore/BasketSlice'
function product({
  product,
  Related_products,
}: {
  product: Product
  Related_products: [Product]
}) {
  const dispatch = useAppDispatch()

  const AddItemToBasket = () => {
    dispatch(AddToBasket({ product, quantity: Quantity }))
  }
  const [Quantity, setQuantity] = useState<number>(1)
  const HandleQuantity = (e: any) => {
    setQuantity(+e.target.value)
  }
  return (
    <main className="mx-auto max-w-screen-2xl shadow-md">
      <div className="mt-10 grid gap-6 sm:grid-cols-4 xl:grid-cols-5 ">
        <img
          src={product?.image}
          alt=""
          className="h-[400px] w-[200px] border-b"
        />
        <div className=" flex flex-col pt-14 sm:col-span-2 xl:col-span-3">
          <h1 className="font-sanserif text-3xl text-gray-600">
            {product?.title}
          </h1>
          <div className="flex space-x-5">
            <span className="flex">
              {Array(Math.floor(product?.rating.rate))
                .fill(null)
                .map((_, index) => (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    key={index}
                    className="h-6 w-6 "
                    viewBox="0 0 20 20"
                    fill="#F4D189"
                  >
                    {' '}
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />{' '}
                  </svg>
                ))}
            </span>
            <span className="text-md text-gray-500">
              {' '}
              {product?.rating.count} ratings
            </span>
          </div>
          <hr className="w-full bg-gray-500 " />
          <div className="space-y-2 pt-4">
            <p className="text-md text-gray-500">
              Price :
              <span className="pl-2 text-lg text-red-600">
                <Currency quantity={product?.price} />{' '}
              </span>
            </p>
            <div className="flex space-x-2">
              <p className="text-md text-gray-500">Quantity</p>
              <select
                name="Quantity"
                className="max-h-32 border"
                onClick={(e) => HandleQuantity(e)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <p className="text-lg text-gray-700">{product?.description}</p>
          </div>
        </div>

        <div className="space-y-4 self-start rounded-lg border p-3 py-4">
          <p className="text-md text-gray-500">
            Total Price :
            <span className="pl-2 text-lg text-red-600">
              <Currency quantity={Quantity * product?.price} />{' '}
            </span>
          </p>
          <button
            type="button"
            className="w-full rounded-md bg-yellow-400 px-4 py-2 hover:bg-yellow-500"
            onClick={AddItemToBasket}
          >
            Add To cart
          </button>
        </div>
      </div>
      <hr className="m-10 mx-auto w-1/2 bg-gray-500" />
      <img
        loading="lazy"
        src="https://m.media-amazon.com/images/I/61DUO0NqyyL._SX3000_.jpg"
        className="hidden w-full object-cover  sm:block "
      />
      <div className="  mt-7 space-y-4   ">
        <h1 className="text-3xl font-semibold ">Items You might Also Like</h1>
        <div className="mx-auto grid max-w-screen-xl  grid-cols-1 gap-3 bg-white sm:grid-cols-2 lg:grid-cols-3">
          {Related_products?.map((product) => (
            <Item product={product} key={product.id} />
          ))}
        </div>
      </div>
    </main>
  )
}

export default product

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const res = await fetch(
      `${process.env.FAKE_STORE_API_URL}products/${params?.id}`
    )

    const product = await res.json()
    const category = product.category
    const res_category = await fetch(
      `https://fakestoreapi.com/products/category/${category}`
    )
    const Related_products = await res_category.json()

    return {
      props: {
        product,
        Related_products,
      },
    }
  } catch (err) {
    console.log(err)
    return {
      props: {},
    }
  }
}
