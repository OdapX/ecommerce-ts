import {createSlice,PayloadAction  } from '@reduxjs/toolkit'
import {Product} from "./../typings"
import type { RootState } from './store'

interface Command {
      product : Product,
      quantity:number

}

interface CommandState{
    Commands  : Command[]
}

const initialState: CommandState = {
      Commands : new Array<Command>()
  }

const BasketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    AddToBasket: (state :CommandState ,action : PayloadAction<Command>) => {
      let exist : boolean = false;
      state.Commands.forEach((command: Command )=> {
           if (command.product.id === action.payload.product.id) {
                        exist = true;
                        command.quantity++;
                        
                        return    
               }
            }
        )
        if(!exist){
         
        state.Commands = [...state.Commands,action.payload]
      
      }
        
      
    },
    RemoveFromBasket : (state: CommandState,action: PayloadAction<number>) => {
       state.Commands= state.Commands.filter(command =>command.product.id !== action.payload)
       console.log(state.Commands)
    }
  }
})
export default BasketSlice.reducer
export const SelectProducts = (state : RootState) => state.Commands
export const { AddToBasket, RemoveFromBasket  } = BasketSlice.actions
