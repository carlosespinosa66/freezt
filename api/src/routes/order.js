const express = require('express');
const {
  getOrders,
  createOrder,
  getActiveOrder,
  updateOrderState,
  getUserOrdersServer,
  addProductsOrder,
  removeProductsOrder,
  deleteProductsOrder,
  updatePaypalOrder,
  updateOrder,
  getHistoryOrder,
  getFilterOrdersState,
} = require('../controllers/order');
const { isLoggedIn, isAdmin } = require('../middleware/auth');

//Creating routes and adding the controllers.

const orderRouter = express.Router();

//user
orderRouter.post('/auth/orders', isLoggedIn, createOrder); //a new product is added to the cart here

orderRouter.get('/auth/orders/hist/:id', isLoggedIn, getHistoryOrder);
orderRouter.get('/auth/orders/user', isLoggedIn, getUserOrdersServer);

orderRouter.get('/orders/state', isLoggedIn, isAdmin, getFilterOrdersState);
orderRouter.put('/auth/orders/pay/:id', isLoggedIn, updatePaypalOrder);

//admin
orderRouter.put(  '/admin/orders/state/:id',  isLoggedIn,  isAdmin,  updateOrderState);
orderRouter.get('/admin/orders', isLoggedIn, isAdmin, getOrders);

//-- orderRouter.put('/auth/orders/info/:id', isLoggedIn, updateOrder);
//-- orderRouter.put('/auth/orders/add', isLoggedIn, addProductsOrder); // add one more existing product +
//-- orderRouter.put('/auth/orders/remove', isLoggedIn, removeProductsOrder); //remove one more existing product -
//-- orderRouter.delete(  '/auth/orders/delete/:ProductId',  isLoggedIn,  deleteProductsOrder);
//-- orderRouter.get('/auth/orders', isLoggedIn, getActiveOrder);




module.exports = orderRouter;

// axios.post('/api/auth/orders',
// axios.put(`/api/admin/orders/state/${id}`
// axios.get('/api/auth/orders/user', {
// axios.get(`/api/auth/orders/hist/${id}`
// await axios.get(`/api/admin/orders`, {
// axios.get('/api/orders/state?status='
// axios.put(`api/auth/orders/pay/${id}`
