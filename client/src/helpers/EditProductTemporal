import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetail,updateProduct } from '../actions';
import { Form, Row, Col, Card, Button, InputGroup } from 'react-bootstrap';

export default function ProductEdit() {
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  const { id } = useParams();
  const allDetail = useSelector((state) => state.detail);
  const [input, setInput] = useState({
    id: '',
    name: '',
    image: '',
    price: '',
    description: '',
    weight: '',
    stock: '',
    discountPercent: '',
    isInDiscount: '',
    discountQty: '',
    soldCount: '',
    rating: '',
    isMale: '',
    isActive: '',
  });
  const handleSubmit = (event) => {
    // const form = event.currentTarget;
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // }else {
      dispatch(updateProduct(input))
    // }

    setValidated(true);
  };

  useEffect(() => {
    const showEditData = () => {
      setInput({
        id: allDetail.id,
        name: allDetail.name,
        image: allDetail.image,
        price: allDetail.price,
        description: allDetail.description,
        weight: allDetail.weight,
        stock: allDetail.stock,
        discountPercent: allDetail.discountPercent,
        isInDiscount: allDetail.isInDiscount,
        discountQty: allDetail.discountQty,
        soldCount: allDetail.soldCount,
        rating: allDetail.rating,
        isMale: allDetail.isMale,
        isActive: allDetail.isActive,
      });
    };

    if (allDetail.length <= 0) {
      dispatch(getProductDetail(id));
    }

    showEditData();
  }, [allDetail, getProductDetail, id]);

  return (
    <div>
      <Helmet>
        <title>Modificar Producto</title>
      </Helmet>
      <h1>Modificar Producto</h1>
      <Form noValidate validated={validated} onSubmit={(e) => handleSubmit(e)}>
        <Row className='mb-3'>
          <Form.Group as={Col} md='4' controlId='validationCustom01'>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              required
              type='text'
              placeholder='Nombre Producto'
              defaultValue={input.name}
            />
            <Form.Control.Feedback type='invalid'>
              Ingrese el Nombre
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md='2' controlId='validationCustom02'>
            <Form.Label>Precio:</Form.Label>
            <Form.Control
              required
              type='number'
              placeholder='Precio'
              defaultValue={input.price}
            />
            <Form.Control.Feedback type='invalid'>
              Ingrese el Precio
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md='2' controlId='validationCustomUsername'>
            <Form.Label>Inventario</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type='number'
                placeholder='Inventario'
                aria-describedby='inputGroupPrepend'
                defaultValue={input.stock}
                required
              />
              <Form.Control.Feedback type='invalid'>
                Ingrese el Inventario.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>

        <Row className='mb-3'>
          <Form.Group as={Col} md='6' controlId='validationCustom03'>
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as='textarea'
              placeholder='Descripción'
              required
              defaultValue={input.description}
              style={{ height: '100px' }}
            />
            <Form.Control.Feedback type='invalid'>
              Ingrese la Descripción.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md='2' controlId='validationCustom04'>
            <Form.Label>Descuento %</Form.Label>
            <Form.Control
              type='number'
              placeholder='Descuento'
              required
              defaultValue={input.discountQty}
            />
            <Form.Control.Feedback type='invalid'>
              Ingrese el Descuento.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group controlId='formFile' as={Col} md='6'>
            <Form.Label>Imagen</Form.Label>
            <Form.Control type='file' required />
            <Form.Control.Feedback type='invalid'>
              Ingrese la Imagen.
            </Form.Control.Feedback>
            <Card as={Col} md='3'>
              <div>
                <img
                  src='/c1.jpg'
                  height='150'
                  width='150'
                  className='d-inline-block align-top'
                  alt='freezt logo'
                />
              </div>
            </Card>
          </Form.Group>
          <Form.Group as={Col} md='2' controlId='validationCustom05'>
            <Form.Label>Activo</Form.Label>
            <Form.Check type='switch' id='isActive' />
            <Form.Control.Feedback type='invalid'>
              Please provide a valid zip.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        {/* <Row>
          <Form.Group className='mb-3'>
            <Form.Check
              required
              label='Agree to terms and conditions'
              feedback='You must agree before submitting.'
              feedbackType='invalid'
            />
          </Form.Group>
        </Row> */}
        <Button as={Col} md='1' type='submit'>
          Grabar
        </Button>
      </Form>
    </div>
  );
}
