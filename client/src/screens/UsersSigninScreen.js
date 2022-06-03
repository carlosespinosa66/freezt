import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Form, Button, Container } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '../redux/actions/Users';
import {getcurrentCartOrder } from '../redux/actions/Orders';
import swal from 'sweetalert';

export default function SigninScreen() {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const allUserInfo = useSelector((state) => state.userInfo.userInfo)
  
  function submitHandler(e) {
    e.preventDefault();

    try {
      dispatch(
        getUserInfo(email, password, (error,token) => {
          if (!error) {
            swal({
              title: 'Autenticado de manera satisfactoria',
              icon: 'success',
            });
            dispatch(getcurrentCartOrder(token))
            navigateTo(redirect || '/');

          } else if (error === '404') {
            swal({
              title: 'Registro',
              text: 'Usuario no encontrado.  Por favor registrese.',
              icon: 'warning',
              dangerMode: true,
              buttons: {
                confirm: true,
              },
            });
            navigateTo('/signup');
          } else if (error === '401') {
            swal({
              title: 'Datos incorrectos',
              text: 'Correo o clave incorrectos.  Trate de nuevo',
              icon: 'warning',
              dangerMode: true,
              buttons: {
                confirm: true,
              },
            });
          }
        })
      );



    } catch (err) {
      console.log(err);
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
