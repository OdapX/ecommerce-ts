import { GetServerSideProps } from 'next'
import { Product } from '../typings'
import Item from './Item'

interface Props {
  products: [Product]
}
function ProductFeed({ products }: Props) {
  return (
    <div className="mx-auto grid -translate-y-5 grid-cols-1 gap-4 px-10 sm:grid-cols-2 md:max-w-screen-2xl xl:-translate-y-64 xl:grid-cols-3">
      {products?.map((product) => (
        <Item product={product} key={product.id} />
      ))}
    </div>
  )
}

export default ProductFeed
