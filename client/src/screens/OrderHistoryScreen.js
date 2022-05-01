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
  
  
  function onCancel() {
    dispatch(getOrdersUser(allUserInfo));
      }

  

  useEffect(() => {
    try {
      dispatch(getOrdersUser(allUserInfo));
    } catch (err) {
      toast.error(getError(err));
    }
  }, [getOrdersUser]);

  return (
    <div>
      <Helmet>
        <title>Order History</title>
      </Helmet>
      <h1>Order History</h1>
      {allLoading ? (
        <LoadingBox></LoadingBox>
      ) : allErrors ? (
        <MessageBox variant='danger'>{allErrors}</MessageBox>
      ) : (
        <table className='table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {!allOrders ? (<LoadingBox></LoadingBox>):(
              allOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{moment(order.paidAt).format('LLL')}</td> 
                  <td>{order.total_amount.toFixed(2)}</td>
                  <td>{order.isPaid ? 'True' : 'No'}</td>
                  <td>
                    {order.isDelivered
                      ? moment(order.deliveredAt).format('LL')
                      : 'No'}
                  </td>
                  <td>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => {
                        navigateTo(`/OrderDetail/${order.id}`);
                      }}
                    >
                      Details
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

            // {/* {allOrders.map((order) => (
            //   <tr key={order.id}>
            //     <td>{order.id}</td>
            //     <td>{order.createdAt.substring(0, 10)}</td>
            //     <td>{order.total_amount.toFixed(2)}</td>
            //     <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
            //     <td>
            //       {order.isDelivered
            //         ? order.deliveredAt.substring(0, 10)
            //         : 'No'}
            //     </td>
            //     <td>
            //       <Button
            //         type='button'
            //         variant='light'
            //         onClick={() => {
            //           navigateTo(`/order/${order.id}`);
            //         }}
            //       >
            //         Details
            //       </Button>
            //     </td>
            //   </tr>
            // ))}
















