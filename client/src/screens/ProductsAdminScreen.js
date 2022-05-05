import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../helpers/LoadingBox';
import MessageBox from '../helpers/MessageBox';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  getProducts,
  OrderByAnyItem,
  getFilterProductsType,
  getFilterProductsState,
} from '../actions/Products';
import {
  Form,
  Row,
  Col,
  Card,
  Button,
  InputGroup,
  FloatingLabel,
} from 'react-bootstrap';

export default function ProductsAdmin() {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const allLoading = useSelector((state) => state.loading);
  const allErrors = useSelector((state) => state.error);
  const allProducts = useSelector((state) => state.products);
  const [orden, setOrden] = useState('');

  function handleFilterProducts(e) {
    e.preventDefault();
    if (e.target.value === 'Todos') {
      dispatch(getProducts());
    } else if (e.target.value === 'Hombre' || e.target.value === 'Mujer') {
      dispatch(getFilterProductsType(e.target.value));
    } else {
      dispatch(getFilterProductsState(e.target.value));
    }
    setOrden(`Ordered ${e.target.value}`);
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(OrderByAnyItem(e.target.value));
    setOrden(`Ordered ${e.target.value}`);
  }

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch, getProducts]);

  return (
    <div>
      <Helmet>
        <title>Administrar Productos</title>
      </Helmet>
      {allLoading ? (
        <LoadingBox></LoadingBox>
      ) : allErrors ? (
        <MessageBox variant='danger'>{allErrors}</MessageBox>
      ) : (
        <table className='table'>
          <thead>
            <Row className='mb-3'>
              <Col>
                <FloatingLabel controlId='floatingSelectGrid' label='Filtrar'>
                  <Form.Select onChange={(e) => handleFilterProducts(e)}>
                    <optgroup label='Tipo'>
                      <option value='Todos'>Todos</option>
                      <option value='Hombre'>Hombre</option>
                      <option value='Mujer'>Mujer</option>
                    </optgroup>
                    <optgroup label='Estado'>
                      <option value='active'>Activo</option>
                      <option value='inactive'>Inactivo</option>
                    </optgroup>
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId='floatingSelectGrid' label='Ordenar'>
                  <Form.Select onChange={(e) => handleSort(e)}>
                    <optgroup label='Inventario'>
                      <option value='asc_stock'>Ascendente</option>
                      <option value='desc_stock'>Descendente</option>
                    </optgroup>
                    <optgroup label='Precio'>
                      <option value='asc_price'>Ascendente</option>
                      <option value='desc_price'>Descendente</option>
                    </optgroup>
                    <optgroup label='Nombre'>
                      <option value='asc_name'>Ascendente</option>
                      <option value='desc_name'>Descendente</option>
                    </optgroup>
                  </Form.Select>
                </FloatingLabel>
              </Col>
            </Row>
          </thead>
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Inventario</th>
              <th>Tipo</th>
              <th>Promoción</th>
              <th>Estado</th>
              {/* <th>Acción</th> */}
              <th>

              <Button
                  type='button'
                  variant='secondary'
                  onClick={() => {
                    navigateTo('/productsadd');
                  }}
                >
                  Adicionar
                </Button>
              </th>

            </tr>
          </thead>
          <tbody>
            {!allProducts ? (
              <LoadingBox />
            ) : (
              allProducts.map((product) => (
                <tr key={product.id}>
                  <td>
                    <img
                      src={product.image}
                      alt={product.name}
                      className='img-fluid rounded img-thumbnail'
                    ></img>{' '}
                  </td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.stock}</td>
                  <td>{product.genres}</td>
                  <td>{product.isInDiscount ? 'Si' : 'No'}</td>
                  <td>{product.isActive ? 'Activo' : 'Inactivo'}</td>
                  <td>
                    <Button
                      type='button'
                      variant='secondary'
                      onClick={() => {
                        navigateTo(`/productedit/${product.id}`);
                      }}
                    >
                      Modificar
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
