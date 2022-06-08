import {combineReducers } from "redux";
import {cartReducer} from './cartReducer'
import {ordersReducer}from './ordersReducer'
import {productsReducer}from './productsReducer'
import {usersReducer} from './usersReducer'
import {countriesReducer} from './countriesReducer'
import {citiesShippingReducer,citiesReducer} from './citiesReducer'


const rootReducer = combineReducers ( {
  userInfo:usersReducer,
  products:productsReducer,
  orders:ordersReducer,
  cart:cartReducer,
  countries:countriesReducer,
  cities:citiesReducer,
  cities_shipping:citiesShippingReducer
})
export default rootReducer
