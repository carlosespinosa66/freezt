import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFilterProductsGenres,
  getSearchTypeManProducts,
} from '../redux/actions/Products';
import { Row, Col, Container } from 'react-bootstrap';

import Product from '../components/Product';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../helpers/LoadingBox';
import MessageBox from '../helpers/MessageBox';

export default function MenClothes() {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products.products);
  const allLoading = useSelector((state) => state.products.loading);
  const allErrors = useSelector((state) => state.products.error);
  const [orden, setOrden] = useState('');

  function handleFilterProducts(e) {
    e.preventDefault();
    if (
      e.target.innerHTML === 'Pantaloneta' ||
      e.target.innerHTML === 'Camiseta' ||
      e.target.innerHTML === 'Conjunto'
    ) {
      dispatch(getSearchTypeManProducts(e.target.innerHTML));
    } else if (e.target.innerHTML === 'Todos') {
      dispatch(getFilterProductsGenres('Hombre'));
    }
  }
  useEffect(() => {
    dispatch(getFilterProductsGenres('Hombre'));
  }, [dispatch]);

  return (
    <Container>
      <Helmet>
        <title>Productos Masculinos</title>
      </Helmet>
      <h2>Productos Masculinos</h2>
      <Row className='col-12 mb-2'>
        <Col md='2'>
          <ul className='nav flex-column paging'>
            <li className='nav-item'>
              <a
                className='nav-link active'
                aria-current='page'
                href='#'
                onClick={(e) => handleFilterProducts(e)}
              >
                Todos
              </a>
            </li>
            <li className='nav-item'>
              <a
                className='nav-link active'
                aria-current='page'
                href='#'
                onClick={(e) => handleFilterProducts(e)}
              >
                Pantaloneta
              </a>
            </li>
            <li className='nav-item'>
              <a
                className='nav-link'
                href='#'
                onClick={(e) => handleFilterProducts(e)}
              >
                Camiseta
              </a>
            </li>
            <li className='nav-item'>
              <a
                className='nav-link'
                href='#'
                onClick={(e) => handleFilterProducts(e)}
              >
                Conjunto
              </a>
            </li>
            <li className='nav-item'>
              <a
                className='nav-link'
                href='#'
                onClick={(e) => handleFilterProducts(e)}
              >
                Medidas
              </a>
            </li>
          </ul>
        </Col>
        <Col md='10'>
          <div className='products'>
            {allLoading ? (
              <LoadingBox />
            ) : allErrors.message ? (
              <MessageBox variant='danger'>{allErrors.message}</MessageBox>
            ) : (
              <Row>
                {allProducts.map((product) => (
                  <Col key={product.id} sm={6} md={4} lg={3} className='mb-3'>
                    <Product product={product}></Product>
                  </Col>
                ))}
              </Row>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
