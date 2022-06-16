import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFilterProductsGenres,
  getSearchTypeWomanProducts,
} from '../redux/actions/Products';
import { Row, Col, Container } from 'react-bootstrap';

import Product from '../components/Product';
import Paging from '../components/Paging';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../helpers/LoadingBox';
import MessageBox from '../helpers/MessageBox';

export default function MenClothes() {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products.products);
  const allLoading = useSelector((state) => state.products.loading);
  const allErrors = useSelector((state) => state.products.error);

  // Paginación
  let productsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  // const [dogsPerPage, setDogsPerPage] = useState(8);
  const indexLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexLastProduct - productsPerPage;

  //Razas para renderizar //Razas actualmente en la página
  const currentProducts = allProducts.slice(indexOfFirstProduct, indexLastProduct);

  const showProducts = (event) => {
    setCurrentPage(event.selected+1);
  };



  function handleFilterProducts(e) {
    e.preventDefault();
    if (
      e.target.innerHTML === 'Pantaloneta' ||
      e.target.innerHTML === 'Camiseta' ||
      e.target.innerHTML === 'Conjunto'
    ) {
      dispatch(getSearchTypeWomanProducts(e.target.innerHTML));
    } else if (e.target.innerHTML === 'Todos') {
      dispatch(getFilterProductsGenres('Mujer'));
    }
    setCurrentPage(1);
  }

  useEffect(() => {
    dispatch(getFilterProductsGenres('Mujer'));
  }, [dispatch]);

  return (
    <Container>
      <Helmet>
        <title>Productos Femeninos</title>
      </Helmet>
      <h2>Productos Femeninos</h2>
      <Row>
        <Col md='2'>
          <ul className='nav flex-column side-bar'>
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
          </ul>
        </Col>
        <Col md='10'>
          <div className='products'>
            {allLoading ? (
              <LoadingBox />
            ) : allErrors.message ? (
              <MessageBox variant='danger'>{allErrors.message}</MessageBox>
            ) : (
              // <Row>
              currentProducts.map((product) => (
                  <Col key={product.id} sm={6} md={4} lg={3} className='mb-3'>
                    <Product product={product}></Product>
                  </Col>
                ))
              // </Row>
            )}
          </div>
          <div>
          <Paging
                productsPerPage={productsPerPage}
                allProducts={allProducts.length}
                showProducts={showProducts}
              />
          </div>
        </Col>
      </Row>
    </Container>
  );
}
