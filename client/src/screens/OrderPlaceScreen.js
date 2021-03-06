import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, Card, Button, ListGroup, Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getError } from '../helpers/utils';
import {  removeAllCarItems } from '../redux/actions/Cart';
import { newOrderCreate } from '../redux/actions/Orders';
import CheckoutSteps from '../helpers/CheckoutSteps';
import LoadingBox from '../helpers/LoadingBox';

export default function OrderPlace() {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const allCart = useSelector((state) => state.cart.cart);
  const allShipping = useSelector((state) => state.cart.cart.shippingAddress);
  const allPayment = useSelector((state) => state.cart.cart.paymentMethod);
  const allCartItems = useSelector((state) => state.cart.cart.cartItems);
  const allLoading = useSelector((state) => state.loading);
  const allUserInfo = useSelector((state) => state.userInfo.userInfo);

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  allCart.itemsPrice = round2(allCartItems.reduce((a, c) => Number(a) + Number(c.quantity) * Number(c.price), 0));

  allCart.shippingPrice = allCart.itemsPrice > 100 ? round2(0) : round2(10);
  allCart.taxPrice = round2(0.19 * allCart.itemsPrice);
  allCart.totalPrice = allCart.itemsPrice + allCart.shippingPrice + allCart.taxPrice;

  function placeOrderHandler(e) {
    e.preventDefault();
    try {
      dispatch(newOrderCreate(allCartItems,
        allShipping,
        allPayment,
        allCart.itemsPrice,
        allCart.shippingPrice,
        allCart.taxPrice,
        allCart.totalPrice,
        allUserInfo.token,
        allUserInfo.email
      ));

      dispatch(removeAllCarItems());
        navigateTo(`/order`);

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
    <Container>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <Helmet>
        <title>Confirmaci??n Orden</title>
      </Helmet>
      <h1 className='my-3'>Confirmaci??n Orden</h1>
      <Row>
        <Col md={8}>
          <Card className='mb-3'>
            <Card.Body>
              <Card.Title>Env??o</Card.Title>
              <Card.Text>
                <strong>Nombre:</strong> {allShipping.fullName} <br />
                <strong>Direcci??n: </strong> {allShipping.address}, {allShipping.city}, {allShipping.country}
              </Card.Text>
              <Link to="/shipping">Modificar</Link>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Forma de Pago</Card.Title>
              <Card.Text>
                <strong>Tipo:</strong> {allPayment}
              </Card.Text>
              <Link to="/shipping">Modificar</Link>
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Art??culos</Card.Title>
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
                        <Link to={`/products/${item.id}`}>{item.name}</Link>
                      </Col>
                      <Col md={3}>
                        <span>{item.quantity}</span>
                      </Col>
                      <Col md={3}>${item.quantity * item.price}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Link to="/cart">Modificar</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Resumen de la Orden</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Art??culos</Col>
                    <Col>${allCart.itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Env??o</Col>
                    <Col>${allCart.shippingPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Impuestos</Col>
                    <Col>${allCart.taxPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Total Orden</strong>
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
                      Confirmar Orden
                    </Button>
                  </div>
                  {allLoading && <LoadingBox></LoadingBox>}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}


