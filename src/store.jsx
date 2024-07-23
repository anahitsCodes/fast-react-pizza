import {configureStore} from "@reduxjs/toolkit";
import userReducer from "../src/features/user/userSlice.js"
import cartReducer from "../src/features/cart/cartSlice.jsx"

const store = configureStore({
  reducer:{
    user: userReducer,
    cart: cartReducer
  }
})

export default store;