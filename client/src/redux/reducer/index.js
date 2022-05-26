import {combineReducers } from "redux";
import {cartReducer} from './cartReducer'
import {ordersReducer}from './ordersReducer'
import {productsReducer}from './productsReducer'
import {usersReducer} from './usersReducer'
import {countriesReducer} from './countriesReducer'
import {citiesBillingReducer, citiesShippingReducer,citiesReducer} from './citiesReducer'


const rootReducer = combineReducers ( {
  userInfo:usersReducer,
  products:productsReducer,
  orders:ordersReducer,
  cart:cartReducer,
  countries:countriesReducer,
  cities:citiesReducer,
  cities_billing:citiesBillingReducer,
  cities_shipping:citiesShippingReducer
})
export default rootReducer
