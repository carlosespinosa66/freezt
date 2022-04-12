
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from 'react-router-dom';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import LoadingBox from '../helpers/LoadingBox';
import MessageBox from '../helpers/MessageBox';
import CheckoutSteps from '../helpers/CheckoutSteps';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { getOrder } from '../actions';
import { toast } from 'react-toastify';
import { getError } from '../helpers/utils';
require('dotenv').config()

export default function OrderScreen() {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const allLoading = useSelector((state) => state.loading);
  const allLoadingPay = useSelector((state) => state.loadingPay);
  const allErrors = useSelector((state) => state.error);
  const allOrder = useSelector((state) => state.order.data);
  const allUserInfo = useSelector((state) => state.userInfo);
  const params = useParams();
  const { id: orderId } = params;
  const [{ isPending },paypalDispatch] = usePayPalScriptReducer();

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

function onApprove(data, actions) {
  return actions.order.capture().then(async function (details,dispatch) {
    try {
      // dispatch({ type: 'PAY_REQUEST' });
      // const { data } = await axios.put(`/api/orders/${allOrder._id}/pay`, details,
      //   {
      //     headers: { authorization: `Bearer ${allUserInfo.token}` },
      //   }
      // );
      // dispatch({ type: 'PAY_SUCCESS', payload: data });
      // toast.success('Order is paid');
    } catch (err) {
      dispatch({ type: 'PAY_FAIL', payload: getError(err) });
      toast.error(getError(err));
    }
  });
}

function onError(err) {
  toast.error(err.message);
}

  const loadPayPalScript = async (clientId) => {

    paypalDispatch({
      type: 'resetOptions',
      value: {
        'client-id': clientId ,
        currency: 'USD',
      },
    });
    paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
  };

  useEffect(() => {

    if (!allUserInfo) {
      navigateTo('/login');
    }
    // if ((!allOrder._id ||allOrder._id === undefined) || (allOrder._id !== undefined && allOrder._id !== orderId)) {
    //   dispatch(getOrder(orderId, allUserInfo.token));
    // }
    // dispatch(loadPayPalScript(allUserInfo.token));
    loadPayPalScript("AQDF4Pff80v8HYThXKSomBe6e5V0Dm64mtsTLbbKijiTN65DZggNtKIJVj5vbCTIbI81ucIueliO2SDe")
    // loadPayPalScript(process.env.REACT_APP_PAYPAL_CLIENT_ID)
    

  }, [allUserInfo, navigateTo, dispatch]);


  return allLoading ? (
    <LoadingBox></LoadingBox>
  ) : allErrors ? (
    <MessageBox variant="danger">{allErrors}</MessageBox>
  ) : (
    <div>
      <CheckoutSteps step1 step2 step3 step4 step5></CheckoutSteps>
      <Helmet>
        <title>Order</title>
      </Helmet>
      <h1 className='my-3'>Order {allOrder._id}</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                <strong>Name:</strong> {allOrder.shippingAddress.fullName} <br />
                <strong>Address: </strong> {allOrder.shippingAddress.address}, {allOrder.shippingAddress.city}, {allOrder.shippingAddress.country}
              </Card.Text>
              {allOrder.isDelivered ? (
                <MessageBox variant="success">
                  Delivered at {allOrder.deliveredAt}
                </MessageBox>
              ) : (
                <MessageBox variant="danger">Not Delivered</MessageBox>
              )}
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Method:</strong> {allOrder.paymentMethod}
              </Card.Text>
              {allOrder.isPaid ? (
                <MessageBox variant="success">
                  Paid at {allOrder.paidAt}
                </MessageBox>
              ) : (
                <MessageBox variant="danger">Not Paid</MessageBox>
              )}
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush">
                {allOrder.orderItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center">
                      <Col md={6}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded img-thumbnail"
                        ></img>{' '} {item.name}
                        {/* <Link to={`/products/${item.slug}`}>{item.name}</Link> */}
                      </Col>
                      <Col md={3}>
                        <span>{item.quantity}</span>
                      </Col>
                      <Col md={3}>${item.price * item.quantity}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col ms={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>${allOrder.itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${allOrder.shippingPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${allOrder.taxPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong> Order Total</strong>
                    </Col>
                    <Col>
                      <strong>${allOrder.totalPrice.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {/* {!allOrder.isPaid && ( */}
                  <ListGroup.Item>
                    {/* {isPending ? ( */}
                      {/* <LoadingBox /> */}
                    {/* ) : ( */}
                      <div>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    {/* )}
                    {allLoadingPay && <LoadingBox></LoadingBox>} */}
                  </ListGroup.Item>
                {/* )} */}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}




// function onApprove(data, actions) {
//   return actions.order.capture().then(async function (details,dispatch) {
//     try {
//       dispatch({ type: 'PAY_REQUEST' });
//       const { data } = await axios.put(`/api/orders/${allOrder._id}/pay`, details,
//         {
//           headers: { authorization: `Bearer ${allUserInfo.token}` },
//         }
//       );
//       dispatch({ type: 'PAY_SUCCESS', payload: data });
//       toast.success('Order is paid');
//     } catch (err) {
//       dispatch({ type: 'PAY_FAIL', payload: getError(err) });
//       toast.error(getError(err));
//     }
//   });
// }