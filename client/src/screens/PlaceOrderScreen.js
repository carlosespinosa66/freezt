import React, { useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import CheckoutSteps from '../helpers/CheckoutSteps';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import { newOrderCreate, removeAllItemsCar  } from '../actions';
import LoadingBox from '../helpers/LoadingBox';



export default function PlaceOrderScreen() {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const allCart = useSelector((state) => state.cart);
  const allShipping = useSelector((state) => state.cart.shippingAddress);
  const allPayment = useSelector((state) => state.cart.paymentMethod);
  const allCartItems = useSelector((state) => state.cart.cartItems);
  const allLoading = useSelector((state) => state.loading);
  const allUserInfo = useSelector((state) => state.userInfo);
  const allErrors = useSelector((state) => state.error);
  const allOrder = useSelector((state) => state.order.data);

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  allCart.itemsPrice = round2(allCartItems.reduce((a, c) => Number(a) + Number(c.quantity) * Number(c.price), 0));

  allCart.shippingPrice = allCart.itemsPrice > 100 ? round2(0) : round2(10);
  allCart.taxPrice = round2(0.19 * allCart.itemsPrice);
  allCart.totalPrice = allCart.itemsPrice + allCart.shippingPrice + allCart.taxPrice;

  function placeOrderHandler(e) {
    e.preventDefault();
    try {
    dispatch(newOrderCreate(
      allCartItems,
      allShipping,
      allPayment,
      allCart.itemsPrice,
      allCart.shippingPrice,
      allCart.taxPrice,
      allCart.totalPrice,
      allUserInfo.token));
      dispatch(removeAllItemsCar())
      console.log(allOrder._id)
      navigateTo(`/order/${allOrder._id}`)
    } catch (err) {
      toast.error(getError(err));
    }
  }

  useEffect(() => {
    if (!allPayment) {
      navigateTo('/payment');
    }
  }, [allPayment, navigateTo]);

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <Helmet>
        <title>Preview Order</title>
      </Helmet>
      <h1 className='my-3'>Preview Order</h1>
      <Row>
        <Col md={8}>
          <Card className='mb-3'>
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                <strong>Name:</strong> {allShipping.fullName} <br />
                <strong>Address: </strong> {allShipping.address},
                {allShipping.city}, {allShipping.postalCode},
                {allShipping.country}
              </Card.Text>
              <Link to="/shipping">Edit</Link>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Method:</strong> {allPayment}
              </Card.Text>
              <Link to="/payment">Edit</Link>
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush">
                {allCartItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center">
                      <Col md={6}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded img-thumbnail"
                        ></img>{' '}
                        <Link to={`/product/${item.slug}`}>{item.name}</Link>
                      </Col>
                      <Col md={3}>
                        <span>{item.quantity}</span>
                      </Col>
                      <Col md={3}>${item.quantity * item.price}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Link to="/cart">Edit</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>${allCart.itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${allCart.shippingPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${allCart.taxPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong> Order Total</strong>
                    </Col>
                    <Col>
                      <strong>${allCart.totalPrice.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      onClick={placeOrderHandler}
                      disabled={allCart.cartItems.length === 0}
                    >
                      Place Order
                    </Button>
                  </div>
                  {allLoading && <LoadingBox></LoadingBox>}
                  </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
