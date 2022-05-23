import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, Row, Col, ButtonGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { updateUserInfo } from '../redux/actions/Users';

export default function UsersProfile() {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const allUserInfo = useSelector((state) => state.userInfo.userInfo);

  const [name, setName] = useState(allUserInfo.name);
  const [email, setEmail] = useState(allUserInfo.email);
  const [billing_address, setbilling_address] = useState(
    allUserInfo.billing_address
  );
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [input, setInput] = useState({
    name: '',
    surname: '',
    email: '',
    billing_address: '',
    default_shipping_address: '',
    role: '',
    signedInWithGoogle: '',
    isActive: '',
    needsPasswordReset: '',
    password: '',
  });

  // const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
  //   loadingUpdate: false,
  // });
  // const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    try {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      } else if (password !== confirmPassword) {
        toast.error('Password no coincide');
      } else {
        input.password = password;
        dispatch(updateUserInfo(input, allUserInfo.token));
        navigateTo('/');
      }
    } catch (err) {
      toast.error(err);
    }
  };


  const handleInputChange = function(e) {
  
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }
  

  



  useEffect(() => {
    const showEditData = () => {
      setInput({
        name: allUserInfo.name,
        surname: allUserInfo.surname,
        email: allUserInfo.email,
        billing_address: allUserInfo.billing_address,
        default_shipping_address: allUserInfo.default_shipping_address,
        signedInWithGoogle: allUserInfo.signedInWithGoogle,
        isActive: allUserInfo.isActive,

      });
    };

    showEditData();
  }, [allUserInfo]);

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
              value={input.name}
              name="name"
              onChange={(e) => handleInputChange(e)}
              required
            />
          </Form.Group>
          <Form.Group as={Col} mb='5' controlId='surname'>
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              value={input.surname}
              name="surname"
              onChange={(e) => handleInputChange(e)}
              required
            />
          </Form.Group>
        </Row>
        <Row className='col-12 mb-3'>
          <Form.Group as={Col} controlId='email'>
            <Form.Label>Correo: </Form.Label>
            <Form.Control
              type='email'
              name="email"
              value={input.email}
              onChange={(e) => handleInputChange(e)}
              required
            />


          </Form.Group>
        </Row>

        <Row className='col-12 mb-3'>
          <Form.Group as={Col} controlId='billing_address'>
            <Form.Label>Dirección de Facturación</Form.Label>
            <Form.Control
              type='text'
              name="billing_address"
              value={input.billing_address}
              onChange={(e) => handleInputChange(e)}
              required
            />
          </Form.Group>
        </Row>

        <Row className='col-12 mb-3'>
          <Form.Group as={Col} controlId='shipping'>
            <Form.Label>Dirección de envío</Form.Label>
            <Form.Control
              type='text'
              name="default_shipping_address"
              defaultValue={input.default_shipping_address}
              onChange={(e) => handleInputChange(e)}
              required
            />
          </Form.Group>
        </Row>

        <Row className='col-12 mb-3'>
          <Form.Group as={Col} mb='5' controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} mb='5' controlId='password'>
            <Form.Label>Confirmar Password</Form.Label>
            <Form.Control
              type='password'
              onChange={(e) => setConfirmPassword(e.target.value)}
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
