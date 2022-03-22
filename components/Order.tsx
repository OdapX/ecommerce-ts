interface Props {
  id: number
  amount: number
  shipping_amount: number
  images: string[]
  timestamp: number
}
function Order({ id, amount, shipping_amount, images, timestamp }: Props) {
  return (
    <div>
      {id} === {amount} {shipping_amount} === {timestamp}
    </div>
  )
}

export default Order
