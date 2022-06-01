import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { getError } from '../helpers/utils';
import { saveShippingAddress, savePaymentMethod } from '../redux/actions/Cart';
import CheckoutSteps from '../helpers/CheckoutSteps';

export default function OrderShippingAddress() {
  const allUserInfo = useSelector((state) => state.userInfo.userInfo);
  const allShipping = useSelector((state) => state.cart.cart.shippingAddress);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState(allShipping.fullName || '');
  const [address, setAddress] = useState(allShipping.address || '');
  const [city, setCity] = useState(allShipping.city || '');
  const [country, setCountry] = useState(allShipping.country || '');

  const [paymentMethodName, setPaymentMethod] = useState(
    allPayment || 'PayPal'
  );
  const allPayment = useSelector((state) => state.cart.cart.paymentMethod);

  function submitHandler(e) {
    e.preventDefault();

    try {
      dispatch(saveShippingAddress(fullName, address, city, country));
      dispatch(savePaymentMethod(paymentMethodName));
      navigateTo('/placeorder');
      //   navigateTo('/payment');
    } catch (err) {
      toast.error(getError(err));
    }
  }

  useEffect(() => {
    if (!allUserInfo) {
      navigateTo('/signin?redirect=/shipping');
    }
  }, [allUserInfo, navigateTo]);

  return (
    <Container>
      <Helmet>
        <title>Dirección de Envío</title>
      </Helmet>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <Form onSubmit={submitHandler}>
        <Row className='bg-secondary bg-opacity-10'>
          <Col className='col-12 col-lg-6'>
            <div className='container small-container'>
              <h1 className='my-3'>Dirección de Envío</h1>
              <Form.Group className='mb-3' controlId='fullName'>
                <Form.Label>Nombre Completo</Form.Label>
                <Form.Control
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='address'>
                <Form.Label>Dirección</Form.Label>
                <Form.Control
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='city'>
                <Form.Label>Ciudad</Form.Label>
                <Form.Control
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='country'>
                <Form.Label>País</Form.Label>
                <Form.Control
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                />
              </Form.Group>
            </div>
          </Col>
          <Col className='col-12 col-lg-6'>
            <Row>
              <h1 className='my-3'>Forma de Pago</h1>
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
            </Row>
            <Button type='submit' onClick={submitHandler} variant='primary'>
              Continuar
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
