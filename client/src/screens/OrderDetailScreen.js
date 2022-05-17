import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Row, Col, Card, ListGroup, Button , Container } from 'react-bootstrap';
import LoadingBox from '../helpers/LoadingBox';
import MessageBox from '../helpers/MessageBox';
import { toast } from 'react-toastify';
import { getError } from '../helpers/utils';
import { getOrderHistoryDetail } from '../redux/actions/Orders';
import moment from 'moment';

import { useDispatch } from 'react-redux';

export default function OrderDetail() {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const allLoading = useSelector((state) => state.loading);
  const allErrors = useSelector((state) => state.error);
  const allOrder = useSelector((state) => state.orders.orderHistory);
  const allItems = useSelector((state) => state.orders.orderHistory.details);
  const allUserInfo = useSelector((state) => state.userInfo.userInfo);
  const { id } = useParams();

  function handleOrders() {
    navigateTo('/orderadmin');
  }

  function handleOrdersHistory() {
    navigateTo('/orderhistory');
  }

  function handleFinished() {
    navigateTo('/MenClothes');
  }

  useEffect(() => {
    try {
      if (id) {
        dispatch(getOrderHistoryDetail(allUserInfo.token, id));
      }
    } catch (err) {
      toast.error(getError(err));
    }
  }, [getOrderHistoryDetail,allUserInfo, toast]);

  return allLoading ? (
    <LoadingBox></LoadingBox>
  ) : allErrors ? (
    <MessageBox variant='danger'>{allErrors}</MessageBox>
  ) : (
    <Container>
      <Helmet>
        <title>Order History Detail</title>
      </Helmet>
      <h1 className='my-3'>Orden {allOrder.id}</h1>
      {!allOrder ? (
        <LoadingBox></LoadingBox>
      ) : (
        <Row>
          <Col md={8}>
            <Card className='mb-3'>
              <Card.Body>
                <Card.Title>Envío</Card.Title>
                <Card.Text>
                  <strong>Nombre:</strong> {allUserInfo.name} <br />
                  <strong>Dirección: </strong> {allOrder.shipping_address}
                </Card.Text>
                {allOrder.isDelivered ? (
                  <MessageBox variant='success'>
                    Enviada a la dirección: {allOrder.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant='danger'>No ha sido enviada.</MessageBox>
                )}
              </Card.Body>
            </Card>
            <Card className='mb-3'>
              <Card.Body>
                {/* <Card.Title>Forma de Pago</Card.Title> */}
                <Card.Text>
                  <strong>Forma de Pago</strong> {allOrder.paymentSource}
                </Card.Text>
                {allOrder.isPaid ? (
                  <MessageBox variant='success'>
                    Estado: {allOrder.status}. Pagada el día: {moment(allOrder.paidAt).format('LLLL')}
                    {/* Pagada el día: {moment(allOrder.paidAt).format('LLLL')} */}
                  </MessageBox>
                ) : (
                  <MessageBox variant='danger'>Estado: {allOrder.status}. No ha sido Pagada</MessageBox>
                )}
              </Card.Body>
            </Card>

            <Card className='mb-3'>
              <Card.Body>
                <Card.Title>Artículos Comprados</Card.Title>
                {!allItems ? (
                  <LoadingBox></LoadingBox>
                ) : (
                  <ListGroup variant='flush'>
                    {allItems.map((item) => (
                      <ListGroup.Item key={item.productId}>
                        <Row className='align-items-center'>
                          <Col md={6}>
                            <img
                              src={item.image}
                              alt={item.productName}
                              className='img-fluid rounded img-thumbnail'
                            ></img>{' '}
                            {item.productName}
                          </Col>
                          <Col md={3}>
                            <span>{item.quantity}</span>
                          </Col>
                          <Col md={3}>${item.price * item.quantity}</Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </Card.Body>
            </Card>
          </Col>
          <Col ms={4}>
            <Card className='mb-3'>
              <Card.Body>
                <Card.Title>Resumen de la Orden</Card.Title>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Valor Artículos</Col>
                      {/* <Col>${allOrder.total_amount.toFixed(2)}</Col> */}
                      <Col>${allOrder.total_amount}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Envío</Col>
                      {/* <Col>${allOrder.shippingPrice.toFixed(2)}</Col> */}
                      <Col>${allOrder.shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Impuestos</Col>
                      {/* <Col>${allOrder.taxPrice.toFixed(2)}</Col> */}
                      <Col>${allOrder.taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <strong>Total Orden</strong>
                      </Col>
                      <Col>
                        {/* <strong>${allOrder.total_amount.toFixed(2)}</strong> */}
                        <strong>${allOrder.total_amount}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className='d-grid'>
                      {allUserInfo.role !== 'admin' && (
                        <Button type='button' onClick={handleOrdersHistory}>
                          Ordenes
                        </Button>
                      )}
                      {allUserInfo.role !== 'admin' && (
                        <Button type='button' onClick={handleFinished}>
                          Productos
                        </Button>
                      )}

                      {allUserInfo.role === 'admin' && (
                        <Button type='button' onClick={handleOrders}>
                          Ordenes
                        </Button>
                      )}
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}
