export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}
export interface OrderType {
  id: string
  amount: number
  amountShipping: number
  images: string[]
  timestamp: number
}

export interface Command {
  product: Product
  quantity: number
}
