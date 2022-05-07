import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Form, Button, Container } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getUserInfo } from '../actions/Users';
import { getError } from '../helpers/utils';

export default function SigninScreen() {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const allUserInfo = useSelector((state) => state.userInfo);
  // const allErrors = useSelector((state) => state.error);

  function submitHandler(e) {
    e.preventDefault();
    // dispatch(putUserReset())
    try {
      dispatch(getUserInfo(email, password));
      navigateTo(redirect || '/');
      // allErrors.status ? toast.error("Wrong Pawword or Email") : navigateTo(redirect || '/');
    } catch (err) {
      toast.error(getError(err));
    }
  }

  useEffect(() => {
    if (allUserInfo) {
      navigateTo(redirect);
    }
  }, [navigateTo, redirect, allUserInfo]);

  return (
    <Container className='small-container'>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h1 className='my-3'>Ingreso</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className='mb-3' controlId='email'>
          <Form.Label>Correo</Form.Label>
          <Form.Control
            type='email'
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='password'>
          <Form.Label>Clave</Form.Label>
          <Form.Control
            type='password'
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className='mb-3'>
          <Button type='submit'>Ingresar</Button>
        </div>
        <div className='mb-3'>
          Cliente Nuevo ? {'  '}
          <Link to={`/signup?redirect=${redirect}`}>Cliente Nuevo</Link>
        </div>
      </Form>
    </Container>
  );
}
