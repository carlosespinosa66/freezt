import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MessageBox from '../helpers/MessageBox';
import ListGroup from 'react-bootstrap/ListGroup';
import { addProductToCar, removeItemCar } from '../actions';

export default function CartScreen() {
    const dispatch = useDispatch();
    const allCartItems = useSelector((state) => state.cart.cartItems);
    const allProducts = useSelector((state) => state.products);
    const navigateTo = useNavigate();

    function updateCartHandle(itemToAdd, quantity) {
        const itemToVerifyQty = allProducts.find((x) => x._id === itemToAdd._id);
        if (Number(quantity) <= Number(itemToVerifyQty.countinstock)) {
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
        <div>
            <Helmet>
                <title>Carrito de Compras</title>
            </Helmet>
            <h1>Carrito de Compras</h1>

            <Row>
                <Col md={8}>
                    {allCartItems.length === 0 ? (
                        <MessageBox >El carrito está vacio..
                            <Link to="/MenClothes"> Todos lo Productos</Link>
                        </MessageBox>
                    ) : (
                        <ListGroup>
                            {allCartItems.map((item) => (
                                <ListGroup.Item key="item._id">
                                    <Row className="aligng-items-center">
                                        <Col md={4}>
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="img-fluid rounded img-thumbnail"
                                            ></img>{' '}
                                            <Link to={`/products/${item.slug}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={3}>
                                            <Button variant="light"
                                                onClick={(() => updateCartHandle(item, item.quantity - 1))}
                                                disabled={item.quantity === 1}>
                                                <i className="fas fa-minus-circle"></i>
                                            </Button>{' '}
                                            <span>{item.quantity}</span>{' '}
                                            <Button
                                                variant="light"
                                                onClick={(() => updateCartHandle(item, item.quantity + 1))}
                                                disabled={item.quantity === item.countinstock}>
                                                <i className="fas fa-plus-circle"></i>
                                            </Button>
                                        </Col>
                                        <Col md={1}> ${item.price}</Col>
                                        {/* <Col md={1}> ${item.price * item.quantity}</Col> */}
                                        <Col md={2}>
                                            <Button variant="light"
                                                onClick={(() => removeItemHandle(item))}
                                            >
                                                <i className="fas fa-trash"></i>
                                            </Button>{' '}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )

                    }
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h4>
                                        Subtotal ({allCartItems.reduce((a, c) => a + c.quantity, 0)}{' '} items):
                                        $ {allCartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                                    </h4>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <div className='d-grid'>
                                        <Button type='button' variant='primary'
                                            onClick={checkOutHandle}
                                            disabled={allCartItems.length === 0}>
                                            Proceder a la compra
                                        </Button>
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