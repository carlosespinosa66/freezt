import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetail } from '../redux/actions/Products';
import { addProductToCar } from '../redux/actions/Cart';
import {
  Row,
  Col,
  Card,
  Badge,
  Figure,
  Button,
  ListGroup,
  Container,
} from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../helpers/LoadingBox';
import MessageBox from '../helpers/MessageBox';
import Rating from '../helpers/Rating';

export default function ProductDetail() {
  const dispatch = useDispatch();
  const allDetail = useSelector((state) => state.products.detail);
  const allLoading = useSelector((state) => state.products.loading);
  const allErrors = useSelector((state) => state.products.error);
  const allCart = useSelector((state) => state.cart.cart);
  const allProducts = useSelector((state) => state.products.products);
  const navigateTo = useNavigate();

  const params = useParams();
  const { id } = params;

  function addToCartHandler() {
    const itemToAdd = allCart.cartItems.find((x) => x.id === allDetail.id);
    const quantity = itemToAdd ? itemToAdd.quantity + 1 : 1;
    const itemToVerifyQty = allProducts.find((x) => x.id === allDetail.id);
    if (Number(quantity) <= Number(itemToVerifyQty.stock)) {
      dispatch(addProductToCar({ ...allDetail, quantity }));
      navigateTo('/cart');
    } else {
      window.alert('No hay inventario del producto');
    }
  }

  function handleImages(e) {
    e.preventDefault();
    // setBodies(e.target.innerHTML);
    
  }

  useEffect(() => {
    dispatch(getProductDetail(id));
  }, [getProductDetail, dispatch, id]);

  return allLoading ? (
    <LoadingBox />
  ) : allErrors ? (
    <MessageBox variant='danger'>{allErrors}</MessageBox>
  ) : (
    <Container>
      <h3>{allDetail.name}</h3>
      <Row>
        <Col md={3}>
          <img
            className='img-large'
            src={allDetail.image}
            alt={allDetail.name}
          />
        </Col>
        <Col md={3}>
          <Row>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Helmet>
                  <title>{allDetail.name}</title>
                </Helmet>
                <h5>{allDetail.name}</h5>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  rating={allDetail.rating}
                  numReview={allDetail.numReview}
                ></Rating>
              </ListGroup.Item>
              <ListGroup.Item>Precio: ${allDetail.price}</ListGroup.Item>
              <ListGroup.Item>
                Descripción: <p>{allDetail.description}</p>
              </ListGroup.Item>
            </ListGroup>
            <Row>
              <span class='d-block p-2 border border-secondary'>Medidas</span>
            </Row>
          </Row>
          <Row>
            <Figure className='d-inline p-3'>
              <Figure.Image
                src={allDetail.imageone}
                height={50}
                width={50}
                className='border border-secondary'
                onClick={(e) => handleImages(e)}
              />
              <Figure.Image
                src={allDetail.imagetwo}
                height={50}
                width={50}
                className='border border-secondary'
                onClick={(e) => handleImages(e)}
              />
              <Figure.Image
                src={allDetail.imagethree}
                height={50}
                width={50}
                className='border border-secondary'
                onClick={(e) => handleImages(e)}
              />
              <Figure.Image
                src={allDetail.imagefour}
                height={50}
                width={50}
                className='border border-secondary'
                onClick={(e) => handleImages(e)}
              />
            </Figure>
          </Row>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Col> Precio: </Col>
                  <Col> ${allDetail.price}</Col>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col> Estado: </Col>
                    <Col>
                      {' '}
                      {allDetail.stock > 0 ? (
                        <Badge bg='success'>Disponible</Badge>
                      ) : (
                        <Badge bg='danger'>Unavailable</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {allDetail.stock > 0 && (
                  <ListGroup.Item>
                    <div className='d-grid'>
                      <Button onClick={addToCartHandler} variant='primary'>
                        Adicionar al Carrito
                      </Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
