import React, { useEffect } from 'react';
import {useNavigate, useParams } from 'react-router-dom';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { getError } from '../utils';
import { toast } from 'react-toastify';

export default function OrderScreen() {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products);
  const allLoading = useSelector((state) => state.loading);
  const allErrors = useSelector((state) => state.error);
  const allOrder = useSelector((state) => state.order);
  const allLoadingPay = useSelector((state) => state.loadingPay);
  const allSuccessPay = useSelector((state) => state.successPay);
  const allUserInfo = useSelector((state) => state.userinfo);
  
  const params = useParams();
  const { id: orderId } = params;
  const navigateTo = useNavigate();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  
  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: allOrder.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }


  const loadPaypalScript = async () => {
    const { data: clientId } = await axios.get('/api/keys/paypal', {
        headers: { authorization: `Bearer ${allUserInfo.token}` },}
    );
    paypalDispatch({
      type: 'resetOptions',
      value: {
        'client-id': clientId,
        currency: 'USD',
      },
    });
    paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
  };
  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        dispatch({ type: 'PAY_REQUEST' });
        const { data } = await axios.put(
          `/api/orders/${allOrder._id}/pay`,
          details,
          {
            headers: { authorization: `Bearer ${allUserInfo.token}` },
          }
        );
        dispatch({ type: 'PAY_SUCCESS', payload: data });
        toast.success('Order is paid');
      } catch (err) {
        dispatch({ type: 'PAY_FAIL', payload: getError(err) });
        toast.error(getError(err));
      }
    });
  }

  function onError(err) {
    toast.error(getError(err));
  }


  useEffect(() => {
    // loadPaypalScript();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Order </title>
      </Helmet>
      <Col md={8}>
        <Card className="mb-3">
          <Card.Body>
            <Card.Title>Shipping</Card.Title>
          </Card.Body>
        </Card>
      </Col>
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>Order Summary</Card.Title>
          <div>
            <PayPalButtons
              createOrder={createOrder}
              onApprove={onApprove}
              onError={onError}
            >

            </PayPalButtons>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
