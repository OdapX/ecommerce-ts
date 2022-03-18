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
      let exist : boolean = false;
      state.products.forEach((product: Product )=> {
           if (product.id === action.payload.id) {
                        exist = true;
                        return
                       
               }
              }

        )
      
       if(!exist) state.products = [...state.products,action.payload] 
       
      
    },
    RemoveFromBasket : (state: ProduceState,action: PayloadAction<number>) => {
       state.products= state.products.filter(product =>product.id !== action.payload)
       console.log(state.products)
    }
  }
})
export default BasketSlice.reducer
export const SelectProducts = (state : RootState) => state.products
export const { AddToBasket, RemoveFromBasket  } = BasketSlice.actions
