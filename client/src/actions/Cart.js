
import axios from 'axios';
export function getProducts() {
    return async function(dispatch) {
      dispatch({ type: 'PRODUCTS_REQUEST' });
      try {
        var json = await axios.get('/api/products');
        dispatch({
          type: 'PRODUCTS_SUCCESS',
          payload: json.data.data,
        });
      } catch (error) {
        dispatch({
          type: 'PRODUCTS_FAIL',
          payload: { message: error.message },
        });
      }
    };
  }
  
  export function getProductDetail(id) {
    return async function(dispatch) {
      dispatch({ type: 'PRODUCTS_REQUEST_DETAIL' });
      try {
        var json = await axios.get(`/api/products/${id}`);
        dispatch({
          type: 'PRODUCTS_SUCCESS_DETAIL',
          payload: json.data.data,
        });
      } catch (error) {
        dispatch({
          type: 'PRODUCTS_FAIL_DETAIL',
          payload: { message: error.message },
        });
      }
    };
  }
  
  export const updateProduct = (product, token) => {
    return async function(dispatch) {
      try {
        const json = await axios.put(`/api/admin/products/${product.id}`, product, {
          headers: { 'auth-token': token },
        });
        dispatch({
          type: 'PRODUCTS_UPDATE_SUCCESS',
          payload: json.data.data,
        });
      } catch (error) {
        dispatch({
          type: 'PRODUCTS_UPDATE_FAIL',
          payload: '', //{ status: error.response.status },
        });
      }
    };
  };
  
  export function addProductToCar(item) {
    return {
      type: 'CART_ADD_ITEM',
      payload: item,
    };
  }
  
  export function removeItemCar(item) {
    return {
      type: 'CART_REMOVE_ITEM',
      payload: item,
    };
  }
  
  export function removeAllCarItems() {
    return {
      type: 'CART_CLEAR',
      payload: '',
    };
  }