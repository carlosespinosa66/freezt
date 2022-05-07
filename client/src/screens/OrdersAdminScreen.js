import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../helpers/LoadingBox';
import MessageBox from '../helpers/MessageBox';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getOrdersAdmin } from '../actions/Orders';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getError } from '../helpers/utils';
import moment from 'moment';

export default function OrderHistory() {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const allLoading = useSelector((state) => state.loading);
  const allErrors = useSelector((state) => state.error);
  const allUserInfo = useSelector((state) => state.userInfo.token);
  const allOrders = useSelector((state) => state.totalorders);

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
      <h2>Administrar Ordenes</h2>
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
              <th>Enviada</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {!allOrders ? (<LoadingBox></LoadingBox>):(
              allOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{moment(order.paidAt).format('LLL')}</td> 
                  <td>{order.status}</td>
                  <td>{order.total_amount.toFixed(2)}</td>
                  <td>{order.isPaid ? 'Yes' : 'No'}</td>
                  <td>
                    {order.isDelivered
                      ? moment(order.deliveredAt).format('LL')
                      : 'No'}
                  </td>
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

