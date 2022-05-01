import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Row, Col, Card, ListGroup, Button } from 'react-bootstrap';
import LoadingBox from '../helpers/LoadingBox';
import MessageBox from '../helpers/MessageBox';
import { toast } from 'react-toastify';
import { getError } from '../helpers/utils';
import { getOrderFromHistory } from '../actions';
import moment from 'moment';

import { useDispatch } from 'react-redux';

export default function OrderDetail() {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const allLoading = useSelector((state) => state.loading);
  const allLoadingPay = useSelector((state) => state.loadingPay);
  const allErrors = useSelector((state) => state.error);
  const allOrder = useSelector((state) => state.orderHistory);
  const allItems = useSelector((state) => state.orderHistory.details);
  const allUserInfo = useSelector((state) => state.userInfo);
  const { id } = useParams();

  function handleOrders() {
    navigateTo('/orderhistory');
  }

  function handleFinished() {
    navigateTo('/MenClothes');
  }
  
  function onError(err) {
    toast.error(err.message);
  }

  useEffect(() => {
    try {
      if (id) {
        dispatch(getOrderFromHistory(id));
      }
    } catch (err) {
      toast.error(getError(err));
    }
  }, [getOrderFromHistory, toast]);

  return allLoading ? (
    <LoadingBox></LoadingBox>
  ) : allErrors ? (
    <MessageBox variant='danger'>{allErrors}</MessageBox>
  ) : (
    <div>
      <Helmet>
        <title>Order History Detail</title>
      </Helmet>
      <h1 className='my-3'>Order {allOrder.id}</h1>
      {!allOrder ? (<LoadingBox></LoadingBox>):(
      
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

          {/* <Card className='mb-3'>
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
          </Card> */}
        </Col>
        <Col ms={4}>
          <Card className='mb-3'>
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    {/* <Col>${allOrder.total_amount.toFixed(2)}</Col> */}
                    <Col>${allOrder.total_amount}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    {/* <Col>${allOrder.shippingPrice.toFixed(2)}</Col> */}
                    <Col>${allOrder.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    {/* <Col>${allOrder.taxPrice.toFixed(2)}</Col> */}
                    <Col>${allOrder.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong> Order Total</strong>
                    </Col>
                    <Col>
                      {/* <strong>${allOrder.total_amount.toFixed(2)}</strong> */}
                      <strong>${allOrder.total_amount}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className='d-grid'>
                  <Button type='button' onClick={handleOrders}>
                        Order History
                      </Button>
                    <Button type='button' onClick={handleFinished}>
                      Finish
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      )}
    </div>
  );
}
