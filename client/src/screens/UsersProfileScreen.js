import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Form, Button, Row, Col, ButtonGroup } from 'react-bootstrap';

export default function UsersProfile() {
  const navigateTo = useNavigate();
  const allUserInfo = useSelector((state) => state.userInfo.userInfo);
  // const [validated, setValidated] = useState(false);

  // const [name, setName] = useState(userInfo.name);
  // const [email, setEmail] = useState(userInfo.email);
  // const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');

  // const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
  //   loadingUpdate: false,
  // });

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      // dispatch(updateProduct(input, allUserInfo.token));
      // navigateTo('/productsadmin');
    }
    // setValidated(true);
  };

  return (
    <div className='container small-container'>
      <Helmet>
        <title>Perfil del Usuario</title>
      </Helmet>
      <h1 className='my-3'>Perfil del Usuario</h1>
      <Form onSubmit={handleSubmit}>
        <Row className='col-12 mb-3'>
          <Form.Group as={Col} mb='5' controlId='name'>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              value={allUserInfo.name}
              // onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group as={Col} mb='5' controlId='surname'>
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              value={allUserInfo.surname}
              // onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
        </Row>
        <Row className='col-12 mb-3'>
          <Form.Group as={Col} controlId='name'>
            <Form.Label>Correo</Form.Label>
            <Form.Control
              type='email'
              value={allUserInfo.email}
              // onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
        </Row>
        <Row className='col-12 mb-3'>
          <Form.Group as={Col} controlId='shipping'>
            <Form.Label>Dirección de envío</Form.Label>
            <Form.Control
              type='text'
              value={allUserInfo.shipping_address}
              // onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
        </Row>

        <Row className='col-12 mb-3'>
          <Form.Group as={Col} mb='5' controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              // onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} mb='5' controlId='password'>
            <Form.Label>Confirmar Password</Form.Label>
            <Form.Control
              type='password'
              // onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
        </Row>
        <Row className='col-12 mb-3'>
          <Col></Col>
          <Col>
            <ButtonGroup>
              <Button type='submit'>Actualizar</Button>
              <Button
                onClick={() => {
                  navigateTo('/');
                }}
              >
                Cancelar
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
