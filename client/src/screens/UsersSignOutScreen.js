import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { putUserSignOut } from '../actions/Users';
import {putClearOrders} from '../actions/Orders'
import {removeAllCarItems} from '../actions/Cart'
import {putClearProducts} from '../actions/Products'


export default function SignOut() {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      dispatch(putUserSignOut());
      dispatch(putClearOrders())
      dispatch(removeAllCarItems())
      dispatch(putClearProducts())

    } catch (err) {
      console.log(err);
    }
    navigateTo('/');
  }, [putUserSignOut]);
  
  return <div>SignOutScreen</div>;
}
