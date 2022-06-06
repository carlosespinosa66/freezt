import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateUserInfo,
  getUserEditInfo,
  resetUserDetail,
} from '../redux/actions/Users';
import { Form, Row, Col, Button, Container } from 'react-bootstrap';

import { getCountries } from '../redux/actions/Countries';
import {
  getCitiesBilling,
  getCitiesShipping,
  getCities,
} from '../redux/actions/Cities';

export default function UsersAdminEdit() {
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { id } = useParams();
  const allUserInfo = useSelector((state) => state.userInfo.userInfo);
  const allUserDetail = useSelector((state) => state.userInfo.userDetail);
  const allCountries = useSelector((state) => state.countries.countries);
  const allCities = useSelector((state) => state.cities.cities);
  const allCitiesBilling = useSelector(
    (state) => state.cities_billing.cities_billing
  );
  const allCitiesShipping = useSelector(
    (state) => state.cities_shipping.cities_shipping
  );

  const [input, setInput] = useState({
    id: '',
    name: '',
    surname: '',
    email: '',
    role: '',
    signedInWithGoogle: '',
    isActive: '',
    isAdmin: '',
    needsPasswordReset: '',
    shipping_address: '',
    shipping_postalcode: '',
    billing_address: '',
    billing_postalcode: '',
    shipping_city_id: '',
    shipping_city_name: '',
    shipping_country_id: '',
    shipping_country_code: '',
    shipping_postal_code: '',
    billing_city_id: '',
    billing_city_name: '',
    billing_country_id: '',
    billing_country_code: '',
    billing_postal_code: '',
  });

  const getNameAddress = (id, type) => {
    if (type === 'city' && id !== null && id !== undefined) {
      let city_id = allCities.find((city) => city.id === id);
      return city_id ? city_id.name : '';
    } else if (type === 'country' && id !== null && id !== undefined) {
      let country_id = allCountries.find(
        (country) => parseInt(country.id) === parseInt(id)
      );
      return country_id ? country_id.name : '';
    }
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      dispatch(resetUserDetail());
      dispatch(updateUserInfo(input, allUserInfo.token));
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
    } else if (e.target.name === 'billing_country_name') {
      let country = allCountries.find(
        (country) => country.code === e.target.value
      );
      setInput({
        ...input,
        billing_country_name: country ? country.name : '',
        billing_country_code: country ? country.code : '',
        billing_country_id: country ? country.id : '',
        billing_city_name: '',
        billing_city_id: '',
      });
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
    } else if (e.target.name === 'billing_city_name') {
      let city = allCities.find(
        (city) => parseInt(city.id) === parseInt(e.target.value)
      );
      setInput({
        ...input,
        billing_city_name: city ? city.name : '',
        billing_city_id: city ? city.id : '',
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

  const handleCountriesBilling = function(e) {
    e.preventDefault();
    if (e.target.value !== 'Seleccionar') {
      dispatch(getCitiesBilling(e.target.value));
    }
  };
  const handleCountriesShipping = function(e) {
    e.preventDefault();
    if (e.target.value !== 'Seleccionar') {
      dispatch(getCitiesShipping(e.target.value));
    }
  };

  const handleUserCancel = function(e) {
    dispatch(resetUserDetail());
    navigateTo('/usersadmin');
  };

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getCities());
    const showEditData = () => {
      setInput({
        id: allUserDetail.id,
        name: allUserDetail.name,
        surname: allUserDetail.surname,
        email: allUserDetail.email,
        billing_address: allUserDetail.billing_address,
        shipping_address: allUserDetail.shipping_address,
        role: allUserDetail.role,
        isAdmin: allUserDetail.role === 'admin' ? true : false,
        signedInWithGoogle: allUserDetail.signedInWithGoogle,
        isActive: allUserDetail.isActive,
        needsPasswordReset: allUserDetail.needsPasswordReset,
        billing_address: allUserDetail.billing_address,
        billing_postalcode: allUserDetail.billing_postalcode,
        billing_city_id: allUserDetail.billing_city_id,
        billing_country_id: allUserDetail.billing_country_id,
        billing_city_name: allUserDetail.billing_city_name,
        billing_country_name: allUserDetail.billing_country_name,
        shipping_city_id: allUserDetail.shipping_city_id,
        shipping_city_name: allUserDetail.shipping_city_name,
        shipping_country_name: allUserDetail.shipping_country_name,
        shipping_address: allUserDetail.shipping_address,
        shipping_postalcode: allUserDetail.shipping_postalcode,
        shipping_country_id: allUserDetail.shipping_country_id,
      });
    };

    if (allUserDetail.length <= 0) {
      dispatch(getUserEditInfo(id, allUserInfo.token));
    }
    showEditData();
  }, [getUserEditInfo, allUserInfo, allUserDetail]);

  return (
    <Container>
      <Helmet>
        <title>Modificar Usuarios</title>
      </Helmet>
      <h2>Modificar Usuarios</h2>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className='col-12 mb-3'>
          <Form.Group as={Col} md='3' controlId='name'>
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
              name='price'
              defaultValue={input.email}
              onChange={(e) => handleInputChange(e)}
            />
            <Form.Control.Feedback type='invalid'>
              Ingrese el Correo
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className='col-12 mb-3'>
          <Form.Group as={Col} md='6' controlId='billing_address'>
            <Form.Label>Dirección de Facturación</Form.Label>
            <Form.Control
              type='text'
              name='billing_address'
              value={input.billing_address}
              onChange={(e) => handleInputChange(e)}
              required
            />
          </Form.Group>
          <Form.Group as={Col} md='2' controlId='countrybilling'>
            <Form.Label>País - {input.billing_country_name}</Form.Label>
            <Form.Select
              name='billing_country_name'
              onClick={(e) => handleCountriesBilling(e)}
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
          <Form.Group as={Col} md='2' controlId='citybilling'>
            <Form.Label>Ciudad - {input.billing_city_name}</Form.Label>
            <Form.Select
              name='billing_city_name'
              onChange={(e) => handleInputChange(e)}
              required
            >
              <option>Seleccionar</option>
              {allCitiesBilling !== null && allCitiesBilling !== undefined
                ? allCitiesBilling.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))
                : ''}
            </Form.Select>
          </Form.Group>
        </Row>
        <Row className='col-12 mb-3'>
          <Form.Group as={Col} md='6' controlId='shipping'>
            <Form.Label>Dir. de envío</Form.Label>
            <Form.Control
              type='text'
              name='shipping_address'
              defaultValue={input.shipping_address}
              onChange={(e) => handleInputChange(e)}
              required
            />
          </Form.Group>
          <Form.Group as={Col} md='2' controlId='countryshipping'>
            <Form.Label>País - {input.shipping_country_name}</Form.Label>
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
          <Form.Group as={Col} md='2' controlId='cityshipping'>
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

        <Row className='col-12 mb-3'>
          <Form.Group as={Col} md='2' controlId='isindiscount'>
            <Form.Label>Admin</Form.Label>
            <Form.Check
              type='switch'
              id='isAdmin'
              name='isAdmin'
              checked={input.isAdmin}
              onChange={(e) => handleInputChange(e)}
            />
          </Form.Group>
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

        <Button type='submit'>Modificar</Button>
        <Button onClick={() => handleUserCancel()}>Cancelar</Button>
      </Form>
    </Container>
  );
}
