import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../helpers/LoadingBox';
import MessageBox from '../helpers/MessageBox';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getOrdersAdmin,getFilterOrders } from '../actions/Orders';
import { Button, Col, Row, Form, FloatingLabel } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getError } from '../helpers/utils';
import moment from 'moment';

export default function OrderHistory() {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const [orden, setOrden] = useState('');
  const allLoading = useSelector((state) => state.loading);
  const allErrors = useSelector((state) => state.error);
  const allUserInfo = useSelector((state) => state.userInfo.userInfo.token);
  const allOrders = useSelector((state) => state.orders.totalorders);

  function handleFilterOrders(e) {
    e.preventDefault();
    dispatch(getFilterOrders(e.target.value,allUserInfo));
    setOrden(`Ordered ${e.target.value}`);
  }

  function handleSort(e) {
    e.preventDefault();
    // ]dispatch(OrderByAnyItem(e.target.value));
    setOrden(`Ordered ${e.target.value}`);
  }

  useEffect(() => {
    try {
      dispatch(getOrdersAdmin(allUserInfo));
    } catch (err) {
      toast.error(getError(err));
    }
  }, [getOrdersAdmin]);

  return (
    <div>
      <Helmet>
        <title>Administrar Ordenes</title>
      </Helmet>
      {allLoading ? (
        <LoadingBox></LoadingBox>
      ) : allErrors ? (
        <MessageBox variant='danger'>{allErrors}</MessageBox>
      ) : (
        <table className='table'>
          <thead>
            <Row className='mb-3'>
            <Col>
              <h3>Ordenes</h3>
              </Col>

              <Col>
                <FloatingLabel controlId='floatingSelectGrid' label='Filtrar'>
                  <Form.Select onChange={(e) => handleFilterOrders(e)}>
                    <option value='PENDIENTE'>Pendiente</option>
                    <option value='BILLED'>Pagada</option>
                    <option value='PROCESING'>Proceso</option>
                    <option value='CANCELED'>Cancelada</option>
                    <option value='DISPATCHED'>Despachada</option>
                    <option value='DELIVERED'>Entregada</option>
                    <option value='FINISHED'>Finalizada</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId='floatingSelectGrid' label='Ordenar'>
                  <Form.Select onChange={(e) => handleSort(e)}>
                      <option value='asc_name'>Ascendente</option>
                      <option value='desc_name'>Descendente</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
            </Row>
          </thead>
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Total</th>
              <th>Pagada</th>
              {/* <th>Enviada</th> */}
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {!allOrders ? (
              <LoadingBox></LoadingBox>
            ) : (
              allOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{moment(order.paidAt).format('LLL')}</td>
                  <td>{order.status}</td>
                  <td>{order.total_amount.toFixed(2)}</td>
                  <td>{order.isPaid ? 'Yes' : 'No'}</td>
                  {/* <td>
                    {order.isDelivered
                      ? moment(order.deliveredAt).format('LL')
                      : 'No'}
                  </td> */}
                  <td>
                    <Button
                      type='button'
                      variant='secondary'
                      onClick={() => {
                        navigateTo(`/orderdetail/${order.id}`);
                      }}
                    >
                      Detalles
                    </Button>
                    <Button
                      type='button'
                      variant='secondary'
                      onClick={() => {
                        navigateTo(`/orderadminedit/${order.id}`);
                      }}
                    >
                      Modificar
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
