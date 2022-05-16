import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../helpers/LoadingBox';
import MessageBox from '../helpers/MessageBox';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  getOrdersAdmin,
  getFilterOrders,
  putClearOrders,
} from '../redux/actions/Orders';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getError } from '../helpers/utils';
import moment from 'moment';

export default function OrdersAdmin() {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const [orden, setOrden] = useState('');
  const allLoading = useSelector((state) => state.orders.loading);
  const allErrors = useSelector((state) => state.orders.error);
  const allUserInfo = useSelector((state) => state.userInfo.userInfo.token);
  const allOrders = useSelector((state) => state.orders.orders);

  function handleFilterOrders(e) {
    e.preventDefault();

    if (e.target.value === 'ALL') {
      dispatch(getOrdersAdmin(allUserInfo));
    } else {
      dispatch(getFilterOrders(e.target.value, allUserInfo));
    }

    setOrden(`Ordered ${e.target.value}`);
  }

  function handleSort(e) {
    e.preventDefault();
    // ]dispatch(OrderByAnyItem(e.target.value));
    setOrden(`Ordered ${e.target.value}`);
  }

  useEffect(() => {
    try {
      dispatch(putClearOrders());
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
      <table>
        <thead>
          <tr>
            <th>
              <h3>Ordenes</h3>
            </th>
            <th>
              <FloatingLabel controlId='floatingSelectGrid' label='Filtrar'>
                <Form.Select onChange={(e) => handleFilterOrders(e)}>
                  <option></option>
                  <option value='ALL'>Todas</option>
                  <option value='PENDING'>Pendiente</option>
                  <option value='BILLED'>Pagada</option>
                  <option value='PROCESING'>Proceso</option>
                  <option value='CANCELED'>Cancelada</option>
                  <option value='DISPATCHED'>Despachada</option>
                  <option value='DELIVERED'>Entregada</option>
                  <option value='FINISHED'>Finalizada</option>
                </Form.Select>
              </FloatingLabel>
            </th>
          </tr>
        </thead>
      </table>

      {allLoading ? (
        <LoadingBox></LoadingBox>
      ) : allErrors ? (
        <MessageBox variant='danger'>{allErrors}</MessageBox>
      ) : (
        <table className='table'>
          <thead> </thead>
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Total</th>
              <th>Pagada</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {!allOrders ? (
              <LoadingBox></LoadingBox>
            ) : allOrders.length > 0 ? (
              allOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{moment(order.paidAt).format('LLL')}</td>
                  <td>{order.status}</td>
                  <td>{order.total_amount.toFixed(2)}</td>
                  <td>{order.isPaid ? 'Yes' : 'No'}</td>
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
            ) : (
              <MessageBox variant='danger'>
                "No hay ordenes para mostrar en la base de datos."
              </MessageBox>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
