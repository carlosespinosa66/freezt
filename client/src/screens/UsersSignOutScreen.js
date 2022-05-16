import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { putUserSignOut } from '../redux/actions/Users';
import { putClearOrders } from '../redux/actions/Orders';
import { removeAllCarItems } from '../redux/actions/Cart';
import { putClearProducts } from '../redux/actions/Products';

export default function UsersSignOut() {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      dispatch(putUserSignOut());
      dispatch(putClearOrders());
      dispatch(removeAllCarItems());
      dispatch(putClearProducts());
    } catch (err) {
      console.log(err);
    }
    navigateTo('/');
  }, [putUserSignOut, putClearOrders, removeAllCarItems, putClearProducts]);

  return <div>SignOutScreen</div>;
}
