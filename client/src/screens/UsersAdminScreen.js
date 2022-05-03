import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../helpers/LoadingBox';
import MessageBox from '../helpers/MessageBox';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getOrdersUser } from '../actions/index';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getError } from '../helpers/utils';
import moment from 'moment';

export default function OrderHistoryScreen() {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const allLoading = useSelector((state) => state.loading);
  const allErrors = useSelector((state) => state.error);
  const allUserInfo = useSelector((state) => state.userInfo.token);
  const allOrders = useSelector((state) => state.orders);

  // useEffect(() => {
  //   try {
  //     dispatch(getOrders(allUserInfo));
  //   } catch (err) {
  //     toast.error(getError(err));
  //   }
  // }, [getOrdersUser]);

  return (
    <div>
      <Helmet>
        <title>Administrar Usuarios</title>
      </Helmet>
      <h1>Administrar Usuarios</h1>
      {allLoading ? (
        <LoadingBox></LoadingBox>
      ) : allErrors ? (
        <MessageBox variant='danger'>{allErrors}</MessageBox>
      ) : (
        <table className='table'>
          <thead>
            <tr>
              <th>Correo</th>
              <th>Nombre</th>
              <th>Rol</th>
              <th>Google</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {/* {!allOrders ? (<LoadingBox></LoadingBox>):(
              allOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{moment(order.paidAt).format('LLL')}</td> 
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
                      Details
                    </Button>
                  </td>
                </tr>
              ))
            )} */}
          </tbody>
        </table>
      )}
    </div>
  );
}
