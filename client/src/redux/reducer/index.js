import {combineReducers } from "redux";
import {cartReducer} from './cartReducer'
import {ordersReducer}from './ordersReducer'
import {productsReducer}from './productsReducer'
import {usersReducer} from './usersReducer'

const rootReducer = combineReducers ( {
  userInfo:usersReducer,
  products:productsReducer,
  orders:ordersReducer,
  cart:cartReducer,
 
})
export default rootReducer
