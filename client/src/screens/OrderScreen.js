import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Row, Col, Card, ListGroup, Button } from 'react-bootstrap';
import LoadingBox from '../helpers/LoadingBox';
import MessageBox from '../helpers/MessageBox';
import CheckoutSteps from '../helpers/CheckoutSteps';
import { toast } from 'react-toastify';
import { getError } from '../helpers/utils';
import moment from 'moment';

import { useDispatch } from 'react-redux';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';

import { regPaypalOrder } from '../redux/actions/Orders';

export default function Order() {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const allLoading = useSelector((state) => state.orders.loading);
  const allLoadingPay = useSelector((state) => state.orders.loadingPay);
  const allErrors = useSelector((state) => state.orders.error);
  const allOrder = useSelector((state) => state.orders.order.data);
  const allItems = useSelector((state) => state.orders.order.Order_details);
  const allUserInfo = useSelector((state) => state.userInfo.userInfo);
  const [{ options, isPending }, paypalDispatch] = usePayPalScriptReducer();

  function handleFinished() {
    navigateTo('/MenClothes');
  }
  
  function handleOrders() {
    navigateTo('/orderhistory');
  }

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
      toast.success('Order was paid correctly');
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
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    try {
      if (!allUserInfo) {
        navigateTo('/login');
      }
        loadPayPalScript(process.env.REACT_APP_PAYPAL_CLIENT_ID);
    } catch (err) {
      toast.error(getError(err));
    }
  }, [allUserInfo, navigateTo, loadPayPalScript, toast]);

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

  return allLoading ? (
    <LoadingBox></LoadingBox>
  ) : allErrors ? (
    <MessageBox variant='danger'>{allErrors}</MessageBox>
  ) : (
    <div>
      <CheckoutSteps step1 step2 step3 step4 step5></CheckoutSteps>
      <Helmet>
        <title>Order</title>
      </Helmet>
      <h1 className='my-3'>Order {allOrder.id}</h1> 
        <Row>
          <Col md={8}>
            <Card className='mb-3'>
              <Card.Body>
                <Card.Title>Shipping</Card.Title>
                <Card.Text>
                  <strong>Name:</strong> {allUserInfo.name} <br />
                  <strong>Address: </strong> {allOrder.shipping_address}
                </Card.Text>
                {allOrder.isDelivered ? (
                  <MessageBox variant='success'>
                    Delivered at {allOrder.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant='danger'>Not Delivered</MessageBox>
                )}
              </Card.Body>
            </Card>
            <Card className='mb-3'>
              <Card.Body>
                <Card.Title>Payment</Card.Title>
                <Card.Text>
                  <strong>Method:</strong> {allOrder.paymentSource}
                </Card.Text>
                {allOrder.isPaid ? (
                  <MessageBox variant='success'>
                    Paid at: {moment(allOrder.paidAt).format('LLLL')}
                  </MessageBox>
                ) : (
                  <MessageBox variant='danger'>Not Paid</MessageBox>
                )}
              </Card.Body>
            </Card>

            <Card className='mb-3'>
              <Card.Body>
                <Card.Title>Items</Card.Title>
                <ListGroup variant='flush'>
                  {allItems.map((item) => (
                    <ListGroup.Item key={item.Product.id}>
                      <Row className='align-items-center'>
                        <Col md={6}>
                          <img
                            src={item.Product.image}
                            alt={item.Product.name}
                            className='img-fluid rounded img-thumbnail'
                          ></img>{' '}
                          {item.Product.name}
                        </Col>
                        <Col md={3}>
                          <span>{item.quantity}</span>
                        </Col>
                        <Col md={3}>${item.Product.price * item.quantity}</Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          <Col ms={4}>
            <Card className='mb-3'>
              <Card.Body>
                <Card.Title>Order Summary</Card.Title>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Items</Col>
                      <Col>${allOrder.total_amount.toFixed(2)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>${allOrder.shippingPrice.toFixed(2)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>${allOrder.taxPrice.toFixed(2)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <strong> Order Total</strong>
                      </Col>
                      <Col>
                        <strong>${allOrder.total_amount.toFixed(2)}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {!allOrder.isPaid && (
                    <ListGroup.Item>
                      {' '}
                      {isPending ? (
                        <LoadingBox />
                      ) : (
                        <div>
                          <PayPalButtons
                            style={{
                              color: 'blue',
                              layout: 'vertical',
                              height: 40,
                              tagline: false,
                              shape: 'pill',
                              label: 'pay',
                            }}
                            createOrder={createOrder}
                            onApprove={onApprove}
                            onCancel={onCancel}
                            onError={onError}
                          />
                        </div>
                      )}
                      {allLoadingPay && <LoadingBox></LoadingBox>}
                    </ListGroup.Item>
                  )}
                  {allOrder.isPaid && (
                    <div className='d-grid'>
                      <Button type='button' onClick={handleOrders}>
                        Historial de Ordenes
                      </Button>
                      <Button type='button' onClick={handleFinished}>
                        Productos
                      </Button>
                    </div>
                  )}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
    </div>
  );
}
