import { configureStore } from '@reduxjs/toolkit'
import { AddToBasket , RemoveFromBasket} from "./BasketSlice"
import basketReducer from "./BasketSlice"


export const store = configureStore({
  reducer: basketReducer
})





// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch