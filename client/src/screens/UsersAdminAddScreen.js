import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { regUserInfoAdmin } from '../redux/actions/Users';
import { getCitiesShipping, getCities } from '../redux/actions/Cities';
import { getCountries } from '../redux/actions/Countries';
import { Form, Row, Col, Button, Container, ButtonGroup } from 'react-bootstrap';

export default function UsersAdminAdd() {
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const allUserInfo = useSelector((state) => state.userInfo.userInfo);
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
    phone: '',
    role: 'User',
    password: '',
    confirmpassword: '',
    shipping_address: '',
    billing_address: '',
    shipping_city_id: '',
    shipping_city_name: '',
    shipping_country_id: '',
    shipping_country_code: '',
    shipping_postal_code: '',
  });

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      dispatch(regUserInfoAdmin(input, allUserInfo.token));
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
    } else if (e.target.name === 'shipping_country_name') {
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
    } else if (e.target.name === 'role') {
      setInput({
        ...input,
        isAdmin: e.target.value === 'admin' ? true : false,
        role: e.target.value,
      });
    } else {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleUserCancel = function(e) {
    navigateTo('/usersadmin');
  };

  const handleCountriesShipping = function(e) {
    e.preventDefault();
    if (e.target.value !== 'Seleccionar') {
      dispatch(getCitiesShipping(e.target.value));
    }
  };

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getCities());
  }, [getCountries]);

  return (
    <Container className='small-container'>
      <Helmet>
        <title>Crear Usuarios</title>
      </Helmet>
      <h2>Crear Usuarios</h2>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
            <Form.Label>Tel??fono</Form.Label>
            <Form.Control
              required
              type='number'
              placeholder='Tel??fono'
              name='phone'
              defaultValue={input.phone}
              onChange={(e) => handleInputChange(e)}
            />
            <Form.Control.Feedback type='invalid'>
              N??mero Telef??nico
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className='col-12 mb-3'>
          <Form.Group as={Col} md='12' controlId='shipping'>
            <Form.Label>Direcci??n</Form.Label>
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
            <Form.Label>Pa??s - {input.shipping_country_name}</Form.Label>
            <Form.Select
              name='shipping_country_name'
              onClick={(e) => handleCountriesShipping(e)}
              onChange={(e) => handleInputChange(e)}
              required
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
              name='shipping_city_name'
              onChange={(e) => handleInputChange(e)}
              required
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
            <Form.Label>Google</Form.Label>
            <Form.Check
              type='switch'
              id='signedInWithGoogle'
              name='signedInWithGoogle'
              checked={input.signedInWithGoogle}
              onChange={(e) => handleInputChange(e)}
            />
          </Form.Group>

          <Form.Group as={Col} md='3' controlId='needsPasswordReset'>
            <Form.Label>Pwd Reset</Form.Label>
            <Form.Check
              type='switch'
              id='needsPasswordReset'
              name='needsPasswordReset'
              checked={input.needsPasswordReset}
              onChange={(e) => handleInputChange(e)}
            />
          </Form.Group>
          <Form.Group as={Col} md='5' controlId='role'>
            <Form.Label>Role: {input.role}</Form.Label>
            <Form.Select
              name='role'
              defaultValue={input.role}
              onChange={(e) => handleInputChange(e)}
            >
              <option value=''></option>
              <option value='admin'>Admin</option>
              <option value='user'>User</option>
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
              onChange={(e) => handleInputChange(e)}
              required
            />
          </Form.Group>
          <Form.Group
            as={Col}
            md='6'
            className='mb-3'
            controlId='confirmpassword'
          >
            <Form.Label>Confirm Password </Form.Label>
            <Form.Control
              type='password'
              name='confirmpassword'
              onChange={(e) => handleInputChange(e)}
              required
            />
          </Form.Group>
        </Row>
        <Row className='col-12 mb-2'>
        <ButtonGroup>
          <Button type='submit'>Crear</Button>
          <Button onClick={() => handleUserCancel()}>Cancelar</Button>
          </ButtonGroup>
        </Row>
      </Form>
    </Container>
  );
}
