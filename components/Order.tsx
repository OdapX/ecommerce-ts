import moment from 'moment'
import Currency from 'react-currency-formatter'
interface Props {
  id: number
  amount: number
  shipping_amount: number
  images: string[]
  timestamp: number
}
function Order({ id, amount, shipping_amount, images, timestamp }: Props) {
  return (
    <div className="mb-4 w-full space-y-5  ">
      <div className="flex items-center justify-between bg-gray-100 p-3">
        <div className="text-center">
          <p className="font-semibold text-gray-800">Order placed on :</p>
          <p>{moment.unix(timestamp).format('DD MM YYYY')}</p>
        </div>
        <div className="text-center">
          <p className="font-semibold text-gray-800">Total Price :</p>
          {<Currency quantity={amount} />}
        </div>
        <div className="text-xl text-blue-800 underline">
          {images.length} items
        </div>
      </div>
      <div>
        <div className="flex space-x-2 overflow-x-auto bg-white">
          {images.map((image) => (
            <img src={image} className="h-32 w-32" />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Order
