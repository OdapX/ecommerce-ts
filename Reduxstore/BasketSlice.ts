import {createSlice,PayloadAction  } from '@reduxjs/toolkit'
import {Product} from "./../typings"
import type { RootState } from './store'
interface ProduceState{
    products  : Product[]
}

const initialState: ProduceState = {
      products : new Array<Product>()
  }

const BasketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    AddToBasket: (state :ProduceState ,action : PayloadAction<Product>) => {
       
      state.products= [...state.products,action.payload]
      console.log(state.products)
      
    },
    RemoveFromBasket : (state: ProduceState,action: PayloadAction<number>) => {
       state.products= state.products.filter(product =>product.id !== action.payload)
    }
  }
})
export default BasketSlice.reducer
export const SelectProducts = (state : RootState) => state.products
export const { AddToBasket, RemoveFromBasket  } = BasketSlice.actions
