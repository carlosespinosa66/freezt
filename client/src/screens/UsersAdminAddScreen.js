import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { regUserInfo } from '../redux/actions/Users';
import { Form, Row, Col, Button, Container } from 'react-bootstrap';

export default function UsersAdminAdd() {
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const allUserInfo = useSelector((state) => state.userInfo.userInfo);
  
  const [input, setInput] = useState({
    name: '',
    surname: '',
    email: '',
    billing_address: '',
    default_shipping_address: '',
    isActive: true,
    signedInWithGoogle: false,
    needsPasswordReset: false,
    role: 'User',
  });

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      dispatch(regUserInfo(input, allUserInfo.token));
      navigateTo('/usersadmin');
    }
    setValidated(true);
  };

  const handleInputChange = function(e) {
    if (e.target.type === 'checkbox') {
      setInput({
        ...input,
        [e.target.name]: e.target.checked,
      });
    } else if (e.target.type === 'file') {
      input.image = e.target.value;
    } else {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }
  };


  return (
    <Container>
      <Helmet>
        <title>Crear Usuarios</title>
      </Helmet>
      <h2>Crear Usuarios</h2>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className='mb-3'>
          <Form.Group as={Col} md='3' controlId='name'>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              required
              type='text'
              name='name'
              placeholder='Nombres'
              defaultValue={input.name}
              onChange={(e) => handleInputChange(e)}
            />
            <Form.Control.Feedback type='invalid'>
              Ingrese el Nombre
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md='3' controlId='surname'>
            <Form.Label>Apellidos</Form.Label>
            <Form.Control
              required
              type='text'
              name='surname'
              placeholder='Apellidos'
              defaultValue={input.surname}
              onChange={(e) => handleInputChange(e)}
            />
            <Form.Control.Feedback type='invalid'>
              Ingrese el Apellido
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md='4' controlId='email'>
            <Form.Label>Correo</Form.Label>
            <Form.Control
              required
              type='email'
              placeholder='email'
              name='email'
              defaultValue={input.email}
              onChange={(e) => handleInputChange(e)}
            />
            <Form.Control.Feedback type='invalid'>
              Ingrese el Correo
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className='mb-3'>
          <Form.Group as={Col} md='5' controlId='billing_address'>
            <Form.Label>Dirección de Facturación</Form.Label>
            <Form.Control
              as='textarea'
              placeholder='Dirección de Facturación'
              required
              name='billing_address'
              defaultValue={input.billing_address}
              style={{ height: '100px' }}
              onChange={(e) => handleInputChange(e)}
            />
            <Form.Control.Feedback type='invalid'>
              Ingrese la Dirección.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md='5' controlId='default_shipping_address'>
            <Form.Label>Dirección de Envío</Form.Label>
            <Form.Control
              as='textarea'
              placeholder='Dirección de Envío'
              required
              name='default_shipping_address'
              defaultValue={input.default_shipping_address}
              style={{ height: '100px' }}
              onChange={(e) => handleInputChange(e)}
            />
            <Form.Control.Feedback type='invalid'>
              Ingrese la Dirección de Envío.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className='mb-3'>
          <Form.Group as={Col} md='2' controlId='isactive'>
            <Form.Label>Activo</Form.Label>
            <Form.Check
              type='switch'
              id='isActive'
              name='isActive'
              checked={input.isActive}
              onChange={(e) => handleInputChange(e)}
            />
          </Form.Group>

          <Form.Group as={Col} md='2' controlId='signedInWithGoogle'>
            <Form.Label>Google Logon</Form.Label>
            <Form.Check
              type='switch'
              id='signedInWithGoogle'
              name='signedInWithGoogle'
              checked={input.signedInWithGoogle}
              onChange={(e) => handleInputChange(e)}
            />
          </Form.Group>

          <Form.Group as={Col} md='2' controlId='needsPasswordReset'>
            <Form.Label>Password Reset</Form.Label>
            <Form.Check
              type='switch'
              id='needsPasswordReset'
              name='needsPasswordReset'
              checked={input.needsPasswordReset}
              onChange={(e) => handleInputChange(e)}
            />
          </Form.Group>
          <Form.Group as={Col} md='2' controlId='genres'>
            <Form.Label>Role: {input.role}</Form.Label>
            <Form.Select
              name='genres'
              defaultValue={input.role}
              onChange={(e) => handleInputChange(e)}
            >
              <option value=''></option>
              <option value='Admin'>Admin</option>
              <option value='User'>User</option>
            </Form.Select>
          </Form.Group>
        </Row>
        <Button type='submit'>Grabar</Button>
        <Button
          onClick={() => {
            navigateTo('/usersadmin');
          }}
        >
          Cancelar
        </Button>
      </Form>
    </Container>
  );
}
