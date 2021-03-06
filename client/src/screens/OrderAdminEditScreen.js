import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Form,
  Row,
  Col,
  Card,
  ListGroup,
  Button,
  Container,
} from 'react-bootstrap';
import LoadingBox from '../helpers/LoadingBox';
import MessageBox from '../helpers/MessageBox';
import { toast } from 'react-toastify';
import { getError } from '../helpers/utils';
import {
  getOrderHistoryDetail,
  updateOrderStatus,
} from '../redux/actions/Orders';
import moment from 'moment';

const {
  REACT_APP_ORDER_STATUS_PENDING,
  REACT_APP_ORDER_STATUS_CANCELED,
  REACT_APP_ORDER_STATUS_TO_CONFIRM,
  REACT_APP_ORDER_STATUS_BILLED,
  REACT_APP_ORDER_STATUS_PROCESING,
  REACT_APP_ORDER_STATUS_DISPATCHED,
  REACT_APP_ORDER_STATUS_DELIVERED,
  REACT_APP_ORDER_STATUS_FINISHED,
} = process.env;

export default function OrdersAdminEdit() {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const allLoading = useSelector((state) => state.loading);
  const allErrors = useSelector((state) => state.error);
  const allOrder = useSelector((state) => state.orders.orderHistory);
  const allItems = useSelector((state) => state.orders.orderHistory.details);
  const allUserInfo = useSelector((state) => state.userInfo.userInfo);
  const { id } = useParams();

  const [input, setInput] = useState({
    id: id,
    status: allOrder.status,
    email_address: allUserInfo.email,
  });

  function handleOrders() {
    navigateTo('/orderadmin');
  }

  function handleFinished() {
    if (allOrder.status === REACT_APP_ORDER_STATUS_PENDING) {
      if (
        input.status === REACT_APP_ORDER_STATUS_CANCELED ||
        input.status === REACT_APP_ORDER_STATUS_BILLED
      ) {
        dispatch(updateOrderStatus(id, input, allUserInfo.token));
        toast.success('El estado de la orden fué actualizado.');
        navigateTo('/orderadmin');
      } else {
        toast.error('El estado de la orden no puede ser actualizado.');
      }
    } else if (allOrder.status === REACT_APP_ORDER_STATUS_TO_CONFIRM) {
      if (
        input.status === REACT_APP_ORDER_STATUS_CANCELED ||
        input.status === REACT_APP_ORDER_STATUS_BILLED
      ) {
        dispatch(updateOrderStatus(id, input, allUserInfo.token));
        toast.success('El estado de la orden fué actualizado.');
        navigateTo('/orderadmin');
      } else {
        toast.error('El estado de la orden no puede ser actualizado.');
      }
    } else if (allOrder.status === REACT_APP_ORDER_STATUS_BILLED) {
      if (
        input.status === REACT_APP_ORDER_STATUS_PROCESING ||
        input.status === REACT_APP_ORDER_STATUS_DISPATCHED ||
        input.status === REACT_APP_ORDER_STATUS_DELIVERED
      ) {
        dispatch(updateOrderStatus(id, input, allUserInfo.token));
        toast.success('El estado de la orden fué actualizado.');
        navigateTo('/orderadmin');
      } else {
        toast.error('El estado de la orden no puede ser actualizado.');
      }
    } else if (allOrder.status === REACT_APP_ORDER_STATUS_PROCESING) {
      if (
        input.status === REACT_APP_ORDER_STATUS_DISPATCHED ||
        input.status === REACT_APP_ORDER_STATUS_DELIVERED
      ) {
        dispatch(updateOrderStatus(id, input, allUserInfo.token));
        toast.success('El estado de la orden fué actualizado.');
        navigateTo('/orderadmin');
      } else {
        toast.error('El estado de la orden no puede ser actualizado.');
      }
    } else if (allOrder.status === REACT_APP_ORDER_STATUS_DISPATCHED) {
      if (
        input.status === REACT_APP_ORDER_STATUS_DELIVERED ||
        input.status === REACT_APP_ORDER_STATUS_FINISHED
      ) {
        dispatch(updateOrderStatus(id, input, allUserInfo.token));
        toast.success('El estado de la orden fué actualizado.');
        navigateTo('/orderadmin');
      } else {
        toast.error('El estado de la orden no puede ser actualizado.');
      }
    } else if (allOrder.status === REACT_APP_ORDER_STATUS_DELIVERED) {
      if (input.status === REACT_APP_ORDER_STATUS_FINISHED) {
        dispatch(updateOrderStatus(id, input, allUserInfo.token));
        toast.success('El estado de la orden fué actualizado.');
        navigateTo('/orderadmin');
      } else {
        toast.error('El estado de la orden no puede ser actualizado.');
      }
    }
  }

  const handleInputChange = function(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    try {
      if (id) {
        dispatch(getOrderHistoryDetail(allUserInfo.token, id));
      }
    } catch (err) {
      toast.error(getError(err));
    }
  }, [getOrderHistoryDetail, toast]);

  return allLoading ? (
    <LoadingBox></LoadingBox>
  ) : allErrors ? (
    <MessageBox variant='danger'>{allErrors}</MessageBox>
  ) : (
    <Container>
      <Helmet>
        <title>Order History Detail</title>
      </Helmet>
      <h2 className='my-3'>Orden {allOrder.id}</h2>
      {!allOrder ? (
        <LoadingBox></LoadingBox>
      ) : (
        <Row>
          <Col md={8}>
            <Card className='mb-3'>
              <Card.Body>
                <Card.Title>Envío</Card.Title>
                <strong>Nombre:</strong> {allUserInfo.name} <br />
                <strong>Dirección: </strong> {allOrder.shipping_address}
                {allOrder.isDelivered ? (
                  <MessageBox variant='success'>
                    Enviada a la dirección {allOrder.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant='danger'>No ha sido enviada.</MessageBox>
                )}
                <strong>Forma de Pago:</strong> {allOrder.paymentSource}
                {allOrder.isPaid ? (
                  <MessageBox variant='success'>
                    Estado: {allOrder.status}. Pagada el día:{' '}
                    {moment(allOrder.paidAt).format('LLLL')}
                  </MessageBox>
                ) : (
                  <MessageBox variant='danger'>
                    Estado: {allOrder.status}. No ha sido Pagada
                  </MessageBox>
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
                <Card.Title>Resumen Orden</Card.Title>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Valor Artículos</Col>
                      <Col>${allOrder.total_amount}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Envío</Col>
                      <Col>${allOrder.shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Impuestos</Col>
                      <Col>${allOrder.taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <strong>Total Orden</strong>
                      </Col>
                      <Col>
                        <strong>${allOrder.total_amount}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className='d-grid'>
                      <Row>
                        <Col>
                          <Form.Select
                            name='status'
                            defaultValue={input.status}
                            onChange={(e) => handleInputChange(e)}
                          >
                            <option></option>
                            <option value='PROCESING'>Proceso</option>
                            {allOrder.status === 'Por Confirmar' ||
                            allOrder.status === 'Pendiente' ? (
                              <option value='Pagada'>Pagada</option>
                            ) : (
                              ''
                            )}
                            <option value='Cancelada'>Cancelada</option>
                            <option value='Despachada'>Despachada</option>
                            <option value='Entregada'>Entregada</option>
                            <option value='Finalizada'>Finalizada</option>
                          </Form.Select>
                        </Col>
                        <Col>
                          <Button type='button' onClick={handleFinished}>
                            Grabar
                          </Button>
                          <Button type='button' onClick={handleOrders}>
                            Cancelar
                          </Button>
                        </Col>
                      </Row>
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
