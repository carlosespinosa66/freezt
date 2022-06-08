import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, Row, Col, ButtonGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { updateUserProfile } from '../redux/actions/Users';
import { getCountries } from '../redux/actions/Countries';
import { getCitiesShipping, getCities } from '../redux/actions/Cities';

export default function UsersProfile() {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const allUserInfo = useSelector((state) => state.userInfo.userInfo);
  const allCountries = useSelector((state) => state.countries.countries);
  const allCities = useSelector((state) => state.cities.cities);
  const [validated, setValidated] = useState(false);
  const allCitiesShipping = useSelector(
    (state) => state.cities_shipping.cities_shipping
  );

  const [input, setInput] = useState({
    name: '',
    surname: '',
    email: '',
    role: '',
    signedInWithGoogle: '',
    isActive: '',
    phone: '',
    needsPasswordReset: '',
    shipping_address: '',
    shipping_postalcode: '',
    shipping_city_id: '',
    shipping_country_id: '',
    shipping_country_code: '',
    shipping_postal_code: '',
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
    try {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        dispatch(updateUserProfile(input, allUserInfo.token));
        navigateTo('/');
      }
      setValidated(true);
    } catch (err) {
      toast.error(err);
    }
  };

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

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getCities());
    const showEditData = () => {
      setInput({
        name: allUserInfo.name,
        surname: allUserInfo.surname,
        email: allUserInfo.email,
        phone: allUserInfo.phone,
        signedInWithGoogle: allUserInfo.signedInWithGoogle,
        isActive: allUserInfo.isActive,
        shipping_city_id: allUserInfo.shipping_city_id,
        shipping_city_name: allUserInfo.shipping_city_name,
        shipping_country_name: allUserInfo.shipping_country_name,
        shipping_address: allUserInfo.shipping_address,
        shipping_postalcode: allUserInfo.shipping_postalcode,
        shipping_country_id: allUserInfo.shipping_country_id,
      });
    };
    showEditData();
  }, [getCountries, getCities]);

  return (
    <div className='container small-container'>
      <Helmet>
        <title>Perfil del Usuario</title>
      </Helmet>
      <h1 className='my-3'>Perfil del Usuario</h1>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className='col-12 mb-2'>
          <Form.Group as={Col} mb='6' controlId='name'>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              value={input.name}
              name='name'
              onChange={(e) => handleInputChange(e)}
              required
            />
          </Form.Group>
          <Form.Group as={Col} mb='6' controlId='surname'>
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              value={input.surname}
              name='surname'
              onChange={(e) => handleInputChange(e)}
              required
            />
          </Form.Group>
        </Row>
        <Row className='col-12 mb-2'>
          <Form.Group as={Col} md='7' controlId='email'>
            <Form.Label>Correo: </Form.Label>
            <Form.Control
              type='email'
              name='email'
              value={input.email}
              onChange={(e) => handleInputChange(e)}
              required
            />
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
        </Row>
      </Form>
    </div>
  );
}
