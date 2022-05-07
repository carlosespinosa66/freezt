import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../actions/Products';
import { Form, Row, Col, Card, Button, InputGroup } from 'react-bootstrap';

export default function ProductAdd() {
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const allUserInfo = useSelector((state) => state.userInfo);
  const [orden, setOrden] = useState('');

  const [input, setInput] = useState({
    id: '',
    name: '',
    image: '',
    price: '',
    description: '',
    weight: '',
    stock: '',
    discountPercent: '',
    isInDiscount: false,
    rating: '',
    genres: '',
    isActive: true,
    imageFile: '',
  });

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      dispatch(createProduct(input, allUserInfo.token));
      navigateTo('/productsadmin');
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
      input.image = '/images/' + e.target.files[0].name;
      setOrden(`Ordered ${e.target.value}`);
    } else {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <div>
      <Helmet>
        <title>Crear Producto</title>
      </Helmet>
      <h2>Crear Producto</h2>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className='mb-3'>
          <Form.Group as={Col} md='4' controlId='name'>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              required
              type='text'
              name='name'
              placeholder='Nombre Producto'
              defaultValue={input.name}
              onChange={(e) => handleInputChange(e)}
            />
            <Form.Control.Feedback type='invalid'>
              Ingrese el Nombre
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md='2' controlId='price'>
            <Form.Label>Precio:</Form.Label>
            <Form.Control
              required
              type='number'
              placeholder='Precio'
              name='price'
              defaultValue={input.price}
              onChange={(e) => handleInputChange(e)}
            />
            <Form.Control.Feedback type='invalid'>
              Ingrese el Precio
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md='2' controlId='stock'>
            <Form.Label>Inventario:</Form.Label>
            <Form.Control
              required
              type='number'
              name='stock'
              placeholder='Inventario'
              defaultValue={input.stock}
              onChange={(e) => handleInputChange(e)}
            />
            <Form.Control.Feedback type='invalid'>
              Ingrese el Inventario
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md='2' controlId='weight'>
            <Form.Label>Peso (Kgs):</Form.Label>
            <Form.Control
              required
              type='number'
              name='weight'
              placeholder='Peso'
              defaultValue={input.weight}
              onChange={(e) => handleInputChange(e)}
            />
            <Form.Control.Feedback type='invalid'>
              Ingrese el Peso
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className='mb-3'>
          <Form.Group as={Col} md='6' controlId='description'>
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as='textarea'
              placeholder='Descripción'
              required
              name='description'
              defaultValue={input.description}
              style={{ height: '100px' }}
              onChange={(e) => handleInputChange(e)}
            />
            <Form.Control.Feedback type='invalid'>
              Ingrese la Descripción.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md='2' controlId='discountpercent'>
            <Form.Label>Descuento %</Form.Label>
            <Form.Control
              type='number'
              placeholder='Descuento'
              name='discountPercent'
              defaultValue={input.discountPercent}
              onChange={(e) => handleInputChange(e)}
            />
            <Form.Control.Feedback type='invalid'>
              Ingrese el Descuento.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md='1' controlId='isindiscount'>
            <Form.Label>Promoción</Form.Label>
            <Form.Check
              type='switch'
              id='isInDiscount'
              name='isInDiscount'
              checked={input.isInDiscount}
              onChange={(e) => handleInputChange(e)}
            />
          </Form.Group>
          <Form.Group as={Col} md='1' controlId='isactive'>
            <Form.Label>Activo</Form.Label>
            <Form.Check
              type='switch'
              id='isActive'
              name='isActive'
              checked={input.isActive}
              onChange={(e) => handleInputChange(e)}
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group controlId='formFile' as={Col} md='4'>
            <Form.Label>Imagen</Form.Label>
            <Form.Control
              type='file'
              name='imageFile'
              required
              onChange={(e) => handleInputChange(e)}
            />
            <Form.Control.Feedback type='invalid'>
              Ingrese la Imagen.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md='2' controlId='genres'>
            <div>
              <img
                src={input.image}
                height='150'
                width='180'
                className='d-inline-block align-top'
                alt='Foto Producto'
              />
            </div>
          </Form.Group>
          <Form.Group as={Col} md='2' controlId='genres'>
            <Form.Label>Género: {input.genres}</Form.Label>
            <Form.Select
              name='genres'
              required
              defaultValue={input.genres}
              onChange={(e) => handleInputChange(e)}
            >
              <option value=''></option>
              <option value='Hombre'>Hombre</option>
              <option value='Mujer'>Mujer</option>
            </Form.Select>
            <Form.Control.Feedback type='invalid'>
              Ingrese el género.
            </Form.Control.Feedback>            
          </Form.Group>          
        </Row>
        <Button type='submit'>Grabar</Button>
        <Button
          onClick={() => {
            navigateTo('/productsadmin');
          }}
        >
          Cancelar
        </Button>
      </Form>
    </div>
  );
}

