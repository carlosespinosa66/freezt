import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getError } from '../helpers/utils';
import { savePaymentMethod } from '../redux/actions/Cart';
import CheckoutSteps from '../helpers/CheckoutSteps';

export default function OrderPaymentMethod() {
  const dispatch = useDispatch();
  const allShipping = useSelector((state) => state.cart.cart.shippingAddress);
  const allPayment = useSelector((state) => state.cart.cart.paymentMethod);
  const [paymentMethodName, setPaymentMethod] = useState(
    allPayment || 'PayPal'
  );
  const navigateTo = useNavigate();

  function submitHandler(e) {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethodName));
    navigateTo('/placeorder');
    try {
    } catch (err) {
      toast.error(getError(err));
    }
  }

  useEffect(() => {
    if (!allShipping.address) {
      navigateTo('/shipping');
    }
  }, [allShipping, navigateTo]);

  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className='container small-container'>
        <Helmet>
          <title>Forma de Pago</title>
        </Helmet>
        <h1 className='my-3'>Forma de Pago</h1>

        <Form onSubmit={submitHandler}>
          <Form.Group controlId='paypal'>
            <Form.Check
              type='radio'
              id='PayPal'
              label='PayPal'
              value='PayPal'
              checked={paymentMethodName === 'PayPal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='transferencia'>
            <Form.Check
              type='radio'
              id='transferencia'
              label='Transferencia'
              value='transferencia'
              checked={paymentMethodName === 'transferencia'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </Form.Group>
          <Button type='submit' variant='primary'>
            Continuar
          </Button>
        </Form>
      </div>
    </div>
  );
}
