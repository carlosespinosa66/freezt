import React, { useState, useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';
import { getError } from '../helpers/utils';
import { regPaypalOrder } from '../actions';

export default function PayPalCheckoutButtons(props) {
  const dispatch = useDispatch();
  const allUserInfo = useSelector((state) => state.userInfo);
  const [paypalDispatch] = usePayPalScriptReducer();
  const { order } = props;
  const [paidFor, setPaidFor] = useState(false);

  function createOrder(data, actions) {
    return actions.order.create({
      purchase_units: [
        {
          amount: { value: order.totalPrice },
        },
      ],
    });
  }

  // function handleAprove(orderID) {
  //   // Action to update the order with the data returned
  //   dispatch(regPaypalOrder(order.id, orderID));
  //   //if response is success


  //   setPaidFor(true);

  //   //Refresh user's account or suscription status

  //   //if the response us an error
  //   //Alert with the right response.
  // }

  // if (paidFor) {
  //   // display success message, modal or redirect to the succes pag
  //   toast.error('Thank you for your purchase');
  // }

  const onApprove = async (data, actions) => {
    try {
      const orderPaypal = await actions.order.capture();

      dispatch(regPaypalOrder(order._id, orderPaypal,allUserInfo.token));
    
    } catch (err) {
      toast.error(getError(err));
    }
  };

  function onCancel() {
    toast.error('The action was canceled !!');
  }

  function onError(err) {
    toast.error(err.message);
  }

  const loadPayPalScript = () => {
    try {
      paypalDispatch({
        type: 'resetOptions',
        value: {
          // 'client-id': clientId,
          // 'client-id': "AXZqDsuO89YYQ2p3NYf3lHQqmXQiOWSZNegW8N-X71x9tRlUZJUvIRGdaerB7XjJPK20nHRHCNrySJv5",
          currency: 'USD',
        },
      });
      paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
    } catch (err) {
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    try {
      loadPayPalScript();
    } catch (err) {
      toast.error(getError(err));
    }
  }, [loadPayPalScript]);

  return (
    <PayPalButtons
      style={{
        color: 'blue',
        layout: 'vertical',
        height: 40,
        tagline: false,
        shape: 'pill',
        label: 'pay',
        // tagline:true
      }}
      createOrder={createOrder}
      onApprove={onApprove}
      onCancel={onCancel}
      onError={onError}
    />
  );
}
