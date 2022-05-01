import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';
import { getError } from '../helpers/utils';
import { regPaypalOrder } from '../actions';

export default function PayPalCheckoutButtons(props) {
  const dispatch = useDispatch();
  const allUserInfo = useSelector((state) => state.userInfo);
  const [{ options, isPending }, paypalDispatch] = usePayPalScriptReducer();
  const allOrder = props.order;

  function createOrder(data, actions) {
    return actions.order.create({
      purchase_units: [
        {
          amount: { value: allOrder.total_amount },
        },
      ],
    });
  }

  const onApprove = async (data, actions) => {
    try {
      const orderPaypal = await actions.order.capture();

      handleAprove(orderPaypal);
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

  function handleAprove(orderID) {
    try {
      const info = {
        paymentSource: 'PayPal',
        shippingPrice: 0,
        taxPrice: 0,
        orderIdPayment: orderID,
        email_address: allOrder.email_address,
      };

      dispatch(regPaypalOrder(allOrder.id, info, allUserInfo.token));

      // setTimeout(() => {
      //   dispatch(clearCart());
      //   localStorage.removeItem('cart');
      //   dispatch(resetPoducts());
      //   navigate('/products');
      // }, 500);
      // setPaidFor(true);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    try {
      loadPayPalScript(process.env.REACT_APP_PAYPAL_CLIENT_ID);
    } catch (err) {
      toast.error(getError(err));
    }
  }, [loadPayPalScript, toast]);

  const loadPayPalScript = async (clientId) => {
    try {
      paypalDispatch({
        type: 'resetOptions',
        value: {
          ...options,
          'client-id': clientId,
          currency: 'USD',
        },
      });
      paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
    } catch (err) {
      toast.error(getError(err));
    }
  };

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

{
  // !allOrder.isPaid && (
  //   <ListGroup.Item>
  //     {isPending ? (
  //       <LoadingBox />
  //     ) : (
  //       <div>
  //         <PayPalButtons
  //           style={{
  //             color: 'blue',
  //             layout: 'vertical',
  //             height: 40,
  //             tagline: false,
  //             shape: 'pill',
  //             label: 'pay',
  //             // tagline:true
  //           }}
  //           createOrder={createOrder}
  //           onApprove={onApprove}
  //           onCancel={onCancel}
  //           onError={onError}
  //         />
  //       </div>
  //     )}
  //     {allLoadingPay && <LoadingBox></LoadingBox>}
  //   </ListGroup.Item>
  // );
}

/* 
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

*/
