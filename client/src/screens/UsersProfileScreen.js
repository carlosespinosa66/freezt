import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, Row, Col, ButtonGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { updateUserProfile, } from '../redux/actions/Users';
import { getCountries } from '../redux/actions/Countries';
import {getCitiesBilling, getCitiesShipping } from '../redux/actions/Cities';

export default function UsersProfile() {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const allUserInfo = useSelector((state) => state.userInfo.userInfo);
  const allCountries = useSelector((state) => state.countries.countries);
  const allCitiesBilling = useSelector((state) => state.cities_billing.cities_billing);
  const allCitiesShipping = useSelector((state) => state.cities_shipping.cities_shipping);
  
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
    cityIdBilling:'',
    countryIdBilling:'',
    cityIdShipping:'',
    countryIdShipping:'',
    needsPasswordReset: '',
    password: '',
  });

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
        dispatch(updateUserProfile(input, allUserInfo.token));
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
  };

  const handleCountriesBilling = function(e) {
    e.preventDefault();
    dispatch(getCitiesBilling(e.target.value));
    //Evaluar si no trae nada y colocar en blanco el select.
  };
  const handleCountriesShipping = function(e) {
    e.preventDefault();
    dispatch(getCitiesShipping(e.target.value));
    //Evaluar si no trae nada y colocar en blanco el select.
  };


  useEffect(() => {
    dispatch(getCountries());
    const showEditData = () => {
      setInput({
        name: allUserInfo.name,
        surname: allUserInfo.surname,
        email: allUserInfo.email,
        billing_address: allUserInfo.billing_address,
        default_shipping_address: allUserInfo.default_shipping_address,
        cityId:allUserInfo.cityId,
        countryId:allUserInfo.countryId,
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
      <h1 className='my-3' >Perfil del Usuario</h1>
      <Form onSubmit={handleSubmit} >
        <Row className='col-12 mb-3'>
          <Form.Group as={Col} mb='5' controlId='name'>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              value={input.name}
              name='name'
              onChange={(e) => handleInputChange(e)}
              required
            />
          </Form.Group>
          <Form.Group as={Col} mb='5' controlId='surname'>
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              value={input.surname}
              name='surname'
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
              name='email'
              value={input.email}
              onChange={(e) => handleInputChange(e)}
              required
            />
          </Form.Group>
        </Row>

        <Row className='col-12 mb-3'>
          <Form.Group as={Col} md='6' controlId='billing_address'>
            <Form.Label>Dir. de Facturación</Form.Label>
            <Form.Control
              type='text'
              name='billing_address'
              value={input.billing_address}
              onChange={(e) => handleInputChange(e)}
              required
            />
          </Form.Group>
          <Form.Group as={Col} md='3' controlId='countrybilling'>
            <Form.Label>País</Form.Label>
            <Form.Select onChange={(e) => handleCountriesBilling(e)}>
              <option>Seleccionar</option>
              {allCountries.map((country) => (
                <option key={country.id} value={country.code}>
                  {country.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} md='3' controlId='citybilling'>
            <Form.Label>Ciudad</Form.Label>
            <Form.Select>
              <option>Seleccionar</option>
              {allCitiesBilling.length >0 ? 
              (allCitiesBilling.map((city) => (
                <option key={city.id} value={city.code}>
                  {city.name}
                </option>
              ))):('')}
            </Form.Select>
          </Form.Group>          
        </Row>

        <Row className='col-12 mb-3'>
          <Form.Group as={Col} md='6' controlId='shipping'>
            <Form.Label>Dir. de envío</Form.Label>
            <Form.Control
              type='text'
              name='default_shipping_address'
              defaultValue={input.default_shipping_address}
              onChange={(e) => handleInputChange(e)}
              required
            />
          </Form.Group>
          <Form.Group as={Col} md='3' controlId='countryshipping'>
            <Form.Label>País</Form.Label>
            <Form.Select onChange={(e) => handleCountriesShipping(e)}>
              <option>Seleccionar</option>
              {allCountries.map((country) => (
                <option key={country.id} value={country.code}>
                  {country.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} md='3' controlId='cityshipping'>
            <Form.Label>Ciudad</Form.Label>
            <Form.Select >
              <option>Seleccionar</option>
              {allCitiesShipping.length >0 ? 
              (allCitiesShipping.map((city) => (
                <option key={city.id} value={city.code}>
                  {city.name}
                </option>
              ))):(<option value={''}></option>)}
            </Form.Select>
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
