import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getProductDetail, addProductToCar } from '../actions';
import {Row, Col, Card, Button,ListGroup,Badge} from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../helpers/LoadingBox';
import MessageBox from '../helpers/MessageBox';
import Rating from '../helpers/Rating';

export default function ProductDetail() {
  const dispatch = useDispatch();
  const allDetail = useSelector((state) => state.detail);
  const allLoading = useSelector((state) => state.loading);
  const allErrors = useSelector((state) => state.error);
  const allCart = useSelector((state) => state.cart);
  const allProducts = useSelector((state) => state.products);
  const navigateTo = useNavigate()

  const params = useParams();
  const { slug } = params;

  function addToCartHandler() {
    
    const itemToAdd = allCart.cartItems.find((x) => x.id === allDetail.id);
    const quantity = itemToAdd ? itemToAdd.quantity + 1 : 1;
    const itemToVerifyQty = allProducts.find((x) => x.id === allDetail.id);
    if (Number(quantity) <= Number(itemToVerifyQty.stock)) {
      dispatch(addProductToCar({ ...allDetail, quantity }));
      navigateTo("/cart")
    } else {
      window.alert("No hay inventario del producto");
    }
  }

  useEffect(() => {
    dispatch(getProductDetail(slug));
  }, [dispatch, slug]);

  return (

    allLoading ? (<LoadingBox />
    ) : allErrors ? (<MessageBox variant="danger">{allErrors}</MessageBox>
    ) : (
      <div>
        <h1>{slug}</h1>
        <Row>
          <Col md={3}>
            <img className="img-large" src={allDetail.image} alt={allDetail.name} />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Helmet>
                  <title>{allDetail.name}</title>
                </Helmet>
                <h1>{allDetail.name}</h1>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating rating={allDetail.rating} numReview={allDetail.numReview} >
                </Rating>
              </ListGroup.Item>
              <ListGroup.Item>
                Price: ${allDetail.price}
              </ListGroup.Item>
              <ListGroup.Item>
                Description: <p>{allDetail.description}</p>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Col> Price: </Col>
                    <Col> ${allDetail.price}</Col>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col> Status: </Col>
                      <Col> {allDetail.stock > 0 ?
                        <Badge bg="success">In Stock</Badge>
                        :
                        <Badge bg="danger">Unavailable</Badge>}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {allDetail.stock > 0 && (
                    <ListGroup.Item>
                      <div className="d-grid">
                        <Button onClick={addToCartHandler} variant="primary">
                          Add to Cart
                        </Button>
                      </div>
                    </ListGroup.Item >
                  )}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

    )
  );
}
