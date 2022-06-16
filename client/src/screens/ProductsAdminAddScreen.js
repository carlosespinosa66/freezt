import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../redux/actions/Products';
import {
  Form,
  Row,
  Col,
  Figure,
  Button,
  ButtonGroup,
  Nav,
} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

export default function ProductAdd() {
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const allUserInfo = useSelector((state) => state.userInfo.userInfo);
  const [orden, setOrden] = useState('');
  const [bodies, setBodies] = useState('Principales');

  const [input, setInput] = useState({
    id: '',
    name: '',
    image: '',
    imagesec: '',
    price: '',
    description: '',
    weight: '',
    stock: '',
    discountPercent: '',
    isInDiscount: false,
    rating: '',
    genres: '',
    type: '',
    isActive: true,
    imageFile: '',
    imageFileSec: '',
    imageone: '',
    imagetwo: '',
    imagethree: '',
    imagefour: '',
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

  function handleImages(e) {
    e.preventDefault();
    setBodies(e.target.innerHTML);
  }

  const handleInputChange = function(e) {
    if (e.target.type === 'checkbox') {
      setInput({
        ...input,
        [e.target.name]: e.target.checked,
      });
    } else if (e.target.type === 'file') {
      if (e.target.name === 'imageFile') {
        input.image = '/images/' + e.target.files[0].name;
      } else if (e.target.name === 'imageFileSec') {
        input.imagesec = '/images/' + e.target.files[0].name;
      } else if (e.target.name === 'imageone') {
        input.imageone = '/images/' + e.target.files[0].name;
      } else if (e.target.name === 'imagetwo') {
        input.imagetwo = '/images/' + e.target.files[0].name;
      } else if (e.target.name === 'imagethree') {
        input.imagethree = '/images/' + e.target.files[0].name;
      } else if (e.target.name === 'imagefour') {
        input.imagefour = '/images/' + e.target.files[0].name;
      }
      setOrden(`Ordered ${e.target.value}`);
    } else {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }
  };

  useEffect(() => {
    setBodies('Principales');
  }, [setBodies]);

  return (
    <Container>
      <Helmet>
        <title>Crear Producto</title>
      </Helmet>
      <h2>Crear Producto</h2>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className='bg-secondary bg-opacity-10'>
          <Col className='col-12 col-lg-8'>
            <Row className='p-2'>
              <Form.Group as={Col} md='8' controlId='name'>
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
            </Row>
            <Row className='p-2'>
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

              <Form.Group as={Col} md='2' controlId='discountpercent'>
                <Form.Label>Descuento %</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Descuento'
                  required
                  name='discountPercent'
                  defaultValue={input.discountPercent}
                  onChange={(e) => handleInputChange(e)}
                />
                <Form.Control.Feedback type='invalid'>
                  Ingrese el Descuento.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md='2' controlId='isindiscount'>
                <Form.Label>Promoción</Form.Label>
                <Form.Check
                  type='switch'
                  id='isInDiscount'
                  name='isInDiscount'
                  checked={input.isInDiscount}
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

              <Form.Group as={Col} md='2' controlId='tipo'>
                <Form.Label>Tipo: {input.type}</Form.Label>
                <Form.Select
                  name='type'
                  defaultValue={input.type}
                  onChange={(e) => handleInputChange(e)}
                >
                  <option value=''></option>
                  <option value='camiseta'>Camiseta</option>
                  <option value='pantaloneta'>Pantaloneta</option>
                  <option value='conjunto'>Conjunto</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} md='2' controlId='genres'>
                <Form.Label>Género: {input.genres}</Form.Label>
                <Form.Select
                  name='genres'
                  defaultValue={input.genres}
                  onChange={(e) => handleInputChange(e)}
                >
                  <option value=''></option>
                  <option value='Hombre'>Hombre</option>
                  <option value='Mujer'>Mujer</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className='p-2'>
              <Form.Group as={Col} md='12' controlId='description'>
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
            </Row>
          </Col>
          <Col className='col-12 col-lg-4 bg-secondary bg-opacity-10'>
            <Row>
              <Nav variant='tabs' defaultActiveKey='ppal'>
                <Nav.Item>
                  <Nav.Link eventKey='ppal' onClick={(e) => handleImages(e)}>
                    Principales
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='desc' onClick={(e) => handleImages(e)}>
                    Descriptivas
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Row>

            {bodies === 'Principales' ? (
              <Row>
                <Col className='col-12 col-lg-6'>
                  <Row className='p-2 '>
                    <Form.Group controlId='image'>
                      <Form.Label>Imagen</Form.Label>
                      <Figure className='p-2'>
                        <Figure.Image
                          src={input.image}
                          height={125}
                          width={140}
                          className='d-inline-block border border-secondary '
                          alt='Foto Producto'
                        />
                      </Figure>
                    </Form.Group>
                    <Form.Group controlId='formFileImage'>
                      <Form.Control
                        type='file'
                        name='imageFile'
                        className='p-2'
                        onChange={(e) => handleInputChange(e)}
                      />
                      <Form.Control.Feedback type='invalid'>
                        Ingrese la Imagen.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                </Col>
                <Col className='col-12 col-lg-6 '>
                  <Row className='p-2 '>
                    <Form.Group controlId='imageSec'>
                      <Form.Label>Imagen Secundaria</Form.Label>
                      <Figure className='p-2'>
                        <Figure.Image
                          src={input.imagesec}
                          height={125}
                          width={140}
                          className='d-inline-block border border-secondary'
                          alt='Foto Producto'
                        />
                      </Figure>
                    </Form.Group>
                    <Form.Group controlId='imageFileSec'>
                      <Form.Control
                        type='file'
                        name='imageFileSec'
                        className='p-2'
                        onChange={(e) => handleInputChange(e)}
                      />
                      <Form.Control.Feedback type='invalid'>
                        Ingrese la Imagen.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                </Col>
              </Row>
            ) : (
              <Row>
                <Figure className='images-prod p-2 '>
                  <Form.Group controlId='fg_image_one'>
                    <Figure.Image
                      src={input.imageone}
                      height={50}
                      width={50}
                      className='border border-secondary'
                    />
                    <Form.Control
                      type='file'
                      name='imageone'
                      className='p-2'
                      onChange={(e) => handleInputChange(e)}
                    />
                  </Form.Group>
                  <Form.Group controlId='fg_image_two'>
                    <Figure.Image
                      src={input.imagetwo}
                      height={50}
                      width={50}
                      className='border border-secondary'
                    />
                    <Form.Control
                      type='file'
                      name='imagetwo'
                      className='p-2'
                      onChange={(e) => handleInputChange(e)}
                    />
                  </Form.Group>
                  <Form.Group controlId='fg_image_three'>
                    <Figure.Image
                      src={input.imagethree}
                      height={50}
                      width={50}
                      className='border border-secondary'
                    />
                    <Form.Control
                      type='file'
                      name='imagethree'
                      className='p-2'
                      onChange={(e) => handleInputChange(e)}
                    />
                  </Form.Group>

                  <Form.Group controlId='fg_image_four'>
                    <Figure.Image
                      src={input.imagefour}
                      height={50}
                      width={50}
                      className='border border-secondary'
                    />
                    <Form.Control
                      type='file'
                      name='imagefour'
                      className='p-2'
                      onChange={(e) => handleInputChange(e)}
                    />
                  </Form.Group>
                </Figure>
              </Row>
            )}

            <Row className='p-2'>
              <ButtonGroup>
                <Button type='submit'>Grabar</Button>
                <Button
                  onClick={() => {
                    navigateTo('/productsadmin');
                  }}
                >
                  Cancelar
                </Button>
              </ButtonGroup>
            </Row>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
