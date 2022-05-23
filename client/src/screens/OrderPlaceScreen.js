import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, Card, Button, ListGroup, Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getError } from '../helpers/utils';
import {  removeAllCarItems } from '../redux/actions/Cart';
import { newOrderCreate } from '../redux/actions/Orders';
import CheckoutSteps from '../helpers/CheckoutSteps';
import LoadingBox from '../helpers/LoadingBox';

export default function OrderPlace() {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const allCart = useSelector((state) => state.cart.cart);
  const allShipping = useSelector((state) => state.cart.cart.shippingAddress);
  const allPayment = useSelector((state) => state.cart.cart.paymentMethod);
  const allCartItems = useSelector((state) => state.cart.cart.cartItems);
  const allLoading = useSelector((state) => state.loading);
  const allUserInfo = useSelector((state) => state.userInfo.userInfo);

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  allCart.itemsPrice = round2(allCartItems.reduce((a, c) => Number(a) + Number(c.quantity) * Number(c.price), 0));

  allCart.shippingPrice = allCart.itemsPrice > 100 ? round2(0) : round2(10);
  allCart.taxPrice = round2(0.19 * allCart.itemsPrice);
  allCart.totalPrice = allCart.itemsPrice + allCart.shippingPrice + allCart.taxPrice;

  function placeOrderHandler(e) {
    e.preventDefault();
    try {
      dispatch(newOrderCreate(allCartItems,
        allShipping,
        allPayment,
        allCart.itemsPrice,
        allCart.shippingPrice,
        allCart.taxPrice,
        allCart.totalPrice,
        allUserInfo.token,
      ));

      dispatch(removeAllCarItems());
      // if (!allOrder === undefined) {
      //   navigateTo(`/order/${allOrder.id}`);
      // } else {
        navigateTo(`/order`);
      // }

    } catch (err) {
      toast.error(getError(err));
    }
  }

  useEffect(() => {
    if (!allPayment) {
      navigateTo('/payment');
    }
  }, [allPayment, navigateTo]);

  return (
    <Container>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <Helmet>
        <title>Confirmación Orden</title>
      </Helmet>
      <h1 className='my-3'>Confirmación Orden</h1>
      <Row>
        <Col md={8}>
          <Card className='mb-3'>
            <Card.Body>
              <Card.Title>Envío</Card.Title>
              <Card.Text>
                <strong>Nombre:</strong> {allShipping.fullName} <br />
                <strong>Dirección: </strong> {allShipping.address}, {allShipping.city}, {allShipping.country}
              </Card.Text>
              <Link to="/shipping">Modificar</Link>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Forma de Pago</Card.Title>
              <Card.Text>
                <strong>Tipo:</strong> {allPayment}
              </Card.Text>
              <Link to="/payment">Edit</Link>
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Artículos</Card.Title>
              <ListGroup variant="flush">
                {allCartItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center">
                      <Col md={6}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded img-thumbnail"
                        ></img>{' '}
                        <Link to={`/products/${item.slug}`}>{item.name}</Link>
                      </Col>
                      <Col md={3}>
                        <span>{item.quantity}</span>
                      </Col>
                      <Col md={3}>${item.quantity * item.price}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Link to="/cart">Modificar</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Resumen de la Orden</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Artículos</Col>
                    <Col>${allCart.itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Envío</Col>
                    <Col>${allCart.shippingPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Impuestos</Col>
                    <Col>${allCart.taxPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Total Orden</strong>
                    </Col>
                    <Col>
                      <strong>${allCart.totalPrice.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      onClick={placeOrderHandler}
                      disabled={allCart.cartItems.length === 0}
                    >
                      Generar Orden
                    </Button>
                  </div>
                  {allLoading && <LoadingBox></LoadingBox>}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}


// import React, { useEffect } from 'react';
// import { Helmet } from 'react-helmet-async';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';
// import { Row, Col, Card, Button, ListGroup, Container } from 'react-bootstrap';
// import { toast } from 'react-toastify';
// import { getError } from '../helpers/utils';
// import { removeAllCarItems } from '../redux/actions/Cart';
// import { newOrderCreate } from '../redux/actions/Orders';
// import CheckoutSteps from '../helpers/CheckoutSteps';
// import LoadingBox from '../helpers/LoadingBox';

// export default function PlaceOrder() {
//   const dispatch = useDispatch();
//   const navigateTo = useNavigate();
//   const allCart = useSelector((state) => state.cart.cart);
//   const allShipping = useSelector((state) => state.cart.cart.shippingAddress);
//   const allPayment = useSelector((state) => state.cart.cart.paymentMethod);
//   const allCartItems = useSelector((state) => state.cart.cart.cartItems);
//   const allLoading = useSelector((state) => state.loading);
//   const allUserInfo = useSelector((state) => state.userInfo.userInfo);

//   const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
//   allCart.itemsPrice = round2(
//     allCartItems.reduce(
//       (a, c) => Number(a) + Number(c.quantity) * Number(c.price),
//       0
//     )
//   );

//   allCart.shippingPrice = allCart.itemsPrice > 100 ? round2(0) : round2(10);
//   allCart.taxPrice = round2(0.19 * allCart.itemsPrice);
//   allCart.totalPrice =
//     allCart.itemsPrice + allCart.shippingPrice + allCart.taxPrice;

//   function placeOrderHandler(e) {
//     e.preventDefault();
//     try {
//       dispatch(
//         newOrderCreate(
//           allCartItems,
//           allShipping,
//           allPayment,
//           allCart.itemsPrice,
//           allCart.shippingPrice,
//           allCart.taxPrice,
//           allCart.totalPrice,
//           allUserInfo.token
//         )
//       );

//       dispatch(removeAllCarItems());
//       // if (!allOrder === undefined) {
//       //   navigateTo(`/order/${allOrder.id}`);
//       // } else {
//       navigateTo(`/order`);
//       // }
//     } catch (err) {
//       toast.error(getError(err));
//     }
//   }

//   useEffect(() => {
//     if (!allPayment) {
//       navigateTo('/payment');
//     }
//   }, [allPayment, navigateTo]);

//   return (
//     <Container>
//       <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
//       <Helmet>
//         <title>Visualización Orden</title>
//       </Helmet>
//       <h1 className='my-3'>Visualización Orden</h1>
//       <Row>
//         <Col md={8}>
//           <Card className='mb-3'>
//             <Card.Body>
//               <Card.Title>Envío</Card.Title>
//               <Card.Text>
//                 <strong>Nombre:</strong> {allShipping.fullName} <br />
//                 <strong>Dirección: </strong> {allShipping.address},{' '}
//                 {allShipping.city}, {allShipping.country}
//               </Card.Text>
//               <Link to='/shipping'>Edit</Link>
//             </Card.Body>
//           </Card>
//           <Card className='mb-3'>
//             <Card.Body>
//               <Card.Title>Pago</Card.Title>
//               <Card.Text>
//                 <strong>Tipo:</strong> {allPayment}
//               </Card.Text>
//               <Link to='/payment'>Edit</Link>
//             </Card.Body>
//           </Card>

//           <Card className='mb-3'>
//             <Card.Body>
//               <Card.Title>Artículos</Card.Title>
//               <ListGroup variant='flush'>
//                 {allCartItems.map((item) => (
//                   <ListGroup.Item key={item._id}>
//                     <Row className='align-items-center'>
//                       <Col md={6}>
//                         <img
//                           src={item.image}
//                           alt={item.name}
//                           className='img-fluid rounded img-thumbnail'
//                         ></img>{' '}
//                         <Link to={`/products/${item.slug}`}>{item.name}</Link>
//                       </Col>
//                       <Col md={3}>
//                         <span>{item.quantity}</span>
//                       </Col>
//                       <Col md={3}>${item.quantity * item.price}</Col>
//                     </Row>
//                   </ListGroup.Item>
//                 ))}
//               </ListGroup>
//               <Link to='/cart'>Modificar</Link>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col md={4}>
//           <Row>
//           <Card className='mb-3'>
//             <Card.Body>
//               <Card.Title>Resumen de la Orden</Card.Title>
//               <ListGroup variant='flush'>
//                 <ListGroup.Item>
//                   <Row>
//                     <Col>Artículos</Col>
//                     <Col>${allCart.itemsPrice.toFixed(2)}</Col>
//                   </Row>
//                 </ListGroup.Item>
//                 <ListGroup.Item>
//                   <Row>
//                     <Col>Envío</Col>
//                     <Col>${allCart.shippingPrice.toFixed(2)}</Col>
//                   </Row>
//                 </ListGroup.Item>
//                 <ListGroup.Item>
//                   <Row>
//                     <Col>Impuestos</Col>
//                     <Col>${allCart.taxPrice.toFixed(2)}</Col>
//                   </Row>
//                 </ListGroup.Item>
//                 <ListGroup.Item>
//                   <Row>
//                     <Col>
//                       <strong>Total</strong>
//                     </Col>
//                     <Col>
//                       <strong>${allCart.totalPrice.toFixed(2)}</strong>
//                     </Col>
//                   </Row>
//                 </ListGroup.Item>
//               </ListGroup>
//             </Card.Body>
//           </Card>

//           </Row>
//         </Col>
//       </Row>
//     </Container>
//   );
// }


{/* <Row>
<Card className='mb-3'>
  <Card.Body>
    <Card.Title>Datos de la Transferencia</Card.Title>
    <ListGroup variant='flush'>
      <ListGroup.Item>
        <Row>
          <Col><strong>Nro Cuenta</strong></Col>
          <Col>1005-00989</Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col><strong>Tipo</strong></Col>
          <Col>Ahorros</Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col><strong>Entidad</strong></Col>
          <Col>Bancolombia</Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col>
            <strong>Beneficiario</strong>
          </Col>
          <Col>
            Freezt
          </Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <div className='d-grid'>
          <Button
            type='button'
            onClick={placeOrderHandler}
            disabled={allCart.cartItems.length === 0}
          >
            Generar Orden de Compra
          </Button>
        </div>
        {allLoading && <LoadingBox></LoadingBox>}
      </ListGroup.Item>
    </ListGroup>
  </Card.Body>
</Card>

</Row> */}