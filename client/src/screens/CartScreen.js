import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  Row,
  Col,
  Card,
  Button,
  ListGroup,
  Container,
  Alert,
} from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import MessageBox from '../helpers/MessageBox';
import { addProductToCar, removeItemCar } from '../redux/actions/Cart';

export default function Cart() {
  const dispatch = useDispatch();
  const allCartItems = useSelector((state) => state.cart.cart.cartItems);
  const allProducts = useSelector((state) => state.products.products);
  const navigateTo = useNavigate();

  function updateCartHandle(itemToAdd, quantity) {
    const itemToVerifyQty = allProducts.find((x) => x.id === itemToAdd.id);
    if (Number(quantity) <= Number(itemToVerifyQty.stock)) {
      dispatch(addProductToCar({ ...itemToAdd, quantity }));
    }
  }

  function removeItemHandle(item) {
    dispatch(removeItemCar(item));
  }

  function checkOutHandle() {
    navigateTo('/signin?redirect=/shipping');
  }

  return (
    <Container>
      <Helmet>
        <title>Carrito de Compras</title>
      </Helmet>
      <h1>Carrito de Compras</h1>

      <Row>
        <Col md={8}>
          {allCartItems.length === 0 ? (
            <MessageBox>
              <Alert key='secondary' variant='secondary'>
                <Alert.Heading>
                  El carrito está vacío. Puede elegir{' '}
                </Alert.Heading>
                <Alert.Link href='/MenClothes'>Productos de hombre</Alert.Link>.
              </Alert>
              <Alert key='secondary' variant='secondary'>
                <Alert.Heading>
                  El carrito está vacío. Puede elegir{' '}
                </Alert.Heading>
                <Alert.Link href='/WoMenClothes'>Productos de mujer</Alert.Link>.
              </Alert>
            </MessageBox>
          ) : (
            <ListGroup>
              {allCartItems.map((item) => (
                <ListGroup.Item key='item.id'>
                  <Row className='aligng-items-center'>
                    <Col md={4}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className='img-fluid rounded img-thumbnail'
                      ></img>{' '}
                      <Link to={`/products/${item.id}`}>{item.name}</Link>
                    </Col>
                    <Col md={3}>
                      <Button
                        variant='light'
                        onClick={() =>
                          updateCartHandle(item, item.quantity - 1)
                        }
                        disabled={item.quantity === 1}
                      >
                        <i className='fas fa-minus-circle'></i>
                      </Button>{' '}
                      <span>{item.quantity}</span>{' '}
                      <Button
                        variant='light'
                        onClick={() =>
                          updateCartHandle(item, item.quantity + 1)
                        }
                        disabled={item.quantity === item.stock}
                      >
                        <i className='fas fa-plus-circle'></i>
                      </Button>
                    </Col>
                    <Col md={1}> ${item.price}</Col>
                    {/* <Col md={1}> ${item.price * item.quantity}</Col> */}
                    <Col md={2}>
                      <Button
                        variant='light'
                        onClick={() => removeItemHandle(item)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>{' '}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h4>
                    Subtotal ({allCartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                    items): ${' '}
                    {allCartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                  </h4>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className='d-grid'>
                    <Button
                      type='button'
                      variant='primary'
                      onClick={checkOutHandle}
                      disabled={allCartItems.length === 0}
                    >
                      Proceder a la Compra
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
