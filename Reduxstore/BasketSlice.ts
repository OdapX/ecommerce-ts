import {createSlice,PayloadAction  } from '@reduxjs/toolkit'
import {Command} from "./../typings"
import type { RootState } from './store'



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
      let exist :boolean = false;
      let available :boolean = false;
       state.Commands.forEach((command)=>{
         if (command.product.id === action.payload) {
            exist = true
             if(command.quantity > 1){ 
               available =true
               command.quantity--;
               return
              }else{
               available = false
              }
             
       }
      })
       if(exist && !available){
        
          state.Commands= state.Commands.filter(command =>command.product.id !== action.payload)
       }

       
      
    }
  }
})
export default BasketSlice.reducer
export const SelectProducts = (state : RootState) => state.Commands
export const { AddToBasket, RemoveFromBasket  } = BasketSlice.actions
