import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { putUserSignOut } from '../actions/Users';
import { useNavigate } from 'react-router-dom';

export default function SignOut() {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      dispatch(putUserSignOut());
    } catch (err) {
      console.log(err);
    }
    navigateTo('/');
  }, [putUserSignOut]);
  
  return <div>SignOutScreen</div>;
}
