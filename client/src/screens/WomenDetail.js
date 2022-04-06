import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
// import { womenProductDetail } from '../actions';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import {Helmet} from 'react-helmet-async'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

import ListGroup from 'react-bootstrap/ListGroup';
import Rating from '../components/Rating';

export default function WomenDetail() {
  const dispatch = useDispatch();
  const allDetail = useSelector((state) => state.womendetail);
  const allLoading = useSelector((state) => state.loading);
  const allErrors = useSelector((state) => state.error);
  const params = useParams();
  const { slug } = params;

  useEffect(() => {
    // dispatch(womenProductDetail(slug));
  }, [dispatch, slug]);

  return (

    allLoading ? (<LoadingBox/>
    ) : allErrors ? (<MessageBox variant="danger">{allErrors}</MessageBox>
    ) : (
      <div>
        <h1>{slug}</h1>
        <Row>
          <Col md={4}>
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
                Description: <p>{allDetail.Description}</p>
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
                      <Col> {allDetail.countInStock > 0 ?
                        <Badge bg="success">In Stock</Badge>
                        :
                        <Badge bg="danger">Unavailable</Badge>}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {allDetail.countInStock > 0 && (
                    <ListGroup.Item>
                      <div className="d-grid">
                        <Button variant="primary">
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
