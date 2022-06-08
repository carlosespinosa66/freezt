import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Form, Row, Col, Button, Container } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { registerUser } from '../redux/actions/Users';
import { getError } from '../helpers/utils';
import { getCitiesShipping, getCities } from '../redux/actions/Cities';
import { getCountries } from '../redux/actions/Countries';

export default function SignupScreen() {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // const allErrors = useSelector((state) => state.error);
  const [validated, setValidated] = useState(false); 
  const allCountries = useSelector((state) => state.countries.countries);
  const allCities = useSelector((state) => state.cities.cities);
  const allCitiesShipping = useSelector(
    (state) => state.cities_shipping.cities_shipping
  );

  const [input, setInput] = useState({
    name: '',
    surname: '',
    email: '',
    isActive: true,
    signedInWithGoogle: false,
    needsPasswordReset: false,
    role: 'User',
    phone:'',
    password: '',
    shipping_city_id: '',
    shipping_city_name: '',
    shipping_country_id: '',
    shipping_country_code: '',
    shipping_postal_code: '',
  });

  const handleInputChange = function(e) {
    if (e.target.name === 'shipping_country_name') {
      let country = allCountries.find(
        (country) => country.code === e.target.value
      );
      setInput({
        ...input,
        shipping_country_name: country ? country.name : '',
        shipping_country_code: country ? country.code : '',
        shipping_country_id: country ? country.id : '',
        shipping_city_name: '',
        shipping_city_id: '',
      });
    } else if (e.target.name === 'shipping_city_name') {
      let city = allCities.find(
        (city) => parseInt(city.id) === parseInt(e.target.value)
      );
      setInput({
        ...input,
        shipping_city_name: city ? city.name : '',
        shipping_city_id: city ? city.id : '',
      });
    } else {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleCountriesShipping = function(e) {
    e.preventDefault();
    if (e.target.value !== 'Seleccionar') {
      dispatch(getCitiesShipping(e.target.value));
    }
  };

  function submitHandler(e) {
    e.preventDefault();
    try {
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.stopPropagation();
      } else if (password !== confirmPassword) {
        toast.error('Password do not match');
      } else {
        input.password = password;
        dispatch(registerUser(input));
        //Hacer la misma validación de ingreso
        navigateTo('/signin?redirect')
      
      }
      setValidated(true);
    } catch (err) {
      toast.error(getError(err));
    }
  }

  //   useEffect(() => {
  //     if (allUserInfo) {
  //       navigateTo(redirect);
  //     }
  //   }, [navigateTo, redirect, allUserInfo]);

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getCities());
  }, [getCountries]);

  return (
    <Container className='small-container'>
      <Helmet>
        <title>Registro</title>
      </Helmet>
      <h1 className='my-3'>Registro</h1>
      <Form noValidate validated={validated} onSubmit={submitHandler}>
        <Row className='col-12 mb-2'>
          <Form.Group as={Col} md='6' controlId='name'>
            <Form.Label>Nombres</Form.Label>
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
          <Form.Group as={Col} md='6' controlId='surname'>
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
        </Row>
        <Row className='col-12 mb-2'>
          <Form.Group as={Col} md='7' controlId='email'>
            <Form.Label>Correo</Form.Label>
            <Form.Control
              required
              type='email'
              placeholder='Correo'
              name='email'
              defaultValue={input.email}
              onChange={(e) => handleInputChange(e)}
            />
            <Form.Control.Feedback type='invalid'>
              Ingrese el Correo
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md='5' controlId='phone'>
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              required
              type='number'
              placeholder='Teléfono'
              name='phone'
              defaultValue={input.phone}
              onChange={(e) => handleInputChange(e)}
            />
            <Form.Control.Feedback type='invalid'>
              Número Telefónico
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className='col-12 mb-2'>
          <Form.Group as={Col} md='12' controlId='shipping'>
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type='text'
              name='shipping_address'
              defaultValue={input.shipping_address}
              onChange={(e) => handleInputChange(e)}
              required
            />
          </Form.Group>
        </Row>
        <Row className='col-12 mb-2'>
          <Form.Group as={Col} md='6' controlId='countryshipping'>
            <Form.Label>País - {input.shipping_country_name}</Form.Label>
            <Form.Select
              required
              name='shipping_country_name'
              onClick={(e) => handleCountriesShipping(e)}
              onChange={(e) => handleInputChange(e)}
            >
              <option>Seleccionar</option>
              {allCountries.map((country) => (
                <option key={country.id} value={country.code}>
                  {country.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} md='6' controlId='cityshipping'>
            <Form.Label>Ciudad - {input.shipping_city_name}</Form.Label>
            <Form.Select
              required
              name='shipping_city_name'
              onChange={(e) => handleInputChange(e)}
            >
              <option>Seleccionar</option>
              {allCitiesShipping !== null && allCitiesShipping !== undefined ? (
                allCitiesShipping.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))
              ) : (
                <option value={''}></option>
              )}
            </Form.Select>
          </Form.Group>
        </Row>
        <Row className='col-12 mb-2'>
          <Form.Group
            as={Col}
            md='6'
            className='col-12 mb-3'
            controlId='password'
          >
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              name='password'
              //   onChange={(e) => handleInputChange(e)}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group as={Col} md='6' controlId='confirmpassword'>
            <Form.Label>Confirm Password </Form.Label>
            <Form.Control
              type='password'
              name='confirmpassword'
              //   onChange={(e) => handleInputChange(e)}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>
        </Row>

        <div className='mb-3'>
          <Button type='submit'>Registro</Button>
        </div>
        <div className='mb-3'>
          Ya se encuentra registrado ? {'  '}
          <Link to={`/signin?redirect=${redirect}`}>Ingreso</Link>
        </div>
      </Form>
    </Container>
  );
}
