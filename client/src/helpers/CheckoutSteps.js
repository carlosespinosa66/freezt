import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function CheckoutSteps(props) {
  return (
    <Row className='checkout-steps'>
      <Col className={props.step1 ? 'active' : ''}>Ingreso</Col>
      <Col className={props.step2 ? 'active' : ''}>Envío</Col>
      <Col className={props.step3 ? 'active' : ''}>Pago</Col>
      <Col className={props.step4 ? 'active' : ''}>Verificar Orden</Col>
      <Col className={props.step5 ? 'active' : ''}>Orden</Col>
    </Row>
  );
}

// <Row className="checkout-steps">
//     <Col className={props.step1 ? 'active': ''}>Sign-In</Col>
//     <Col className={props.step2 ? 'active': ''}>Shipping</Col>
//     <Col className={props.step3 ? 'active': ''}>Payment</Col>
//     <Col className={props.step4 ? 'active': ''}>Preview Order</Col>
//     <Col className={props.step5 ? 'active': ''}>Order</Col>
// </Row>
