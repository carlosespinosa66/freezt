import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Row, Col, Card, ListGroup } from 'react-bootstrap';
import PayPalCheckoutButtons from '../components/PayPalCheckoutButtons';
import LoadingBox from '../helpers/LoadingBox';
import MessageBox from '../helpers/MessageBox';
import CheckoutSteps from '../helpers/CheckoutSteps';
import { toast } from 'react-toastify';
import { getError } from '../helpers/utils';

export default function OrderScreen() {
  const navigateTo = useNavigate();
  const allLoading = useSelector((state) => state.loading);
  const allLoadingPay = useSelector((state) => state.loadingPay);
  const allErrors = useSelector((state) => state.error);
  const allOrder = useSelector((state) => state.order.data);
  const allItems = useSelector((state) => state.order.Order_details);
  const allUserInfo = useSelector((state) => state.userInfo);
    
  useEffect(() => {
    try {
      if (!allUserInfo) {
        navigateTo('/login');
      }
    } catch (err) {
      toast.error(getError(err));
    }
  }, [allUserInfo,toast, navigateTo]);

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
                {/* <strong>Name:</strong> {allOrder.shippingAddress.fullName}{' '} */}
                <strong>Name:</strong> {allUserInfo.name}{' '}
                <br />
                {/* <strong>Address: </strong> {allOrder.shippingAddress.address},{' '}
                {allOrder.shippingAddress.city},{' '}
                {allOrder.shippingAddress.country} */}
                <strong>Address: </strong> {allOrder.shippingAddress}
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
              {allOrder.paidAt ? (
                <MessageBox variant='success'>
                  Paid at {allOrder.paidAt}
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
                        {/* <Link to={`/products/${item.slug}`}>{item.name}</Link> */}
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
                <ListGroup.Item>
                  <div>
                    <PayPalCheckoutButtons
                      order={allOrder}
                    ></PayPalCheckoutButtons>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

