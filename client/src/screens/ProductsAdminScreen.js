import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../helpers/LoadingBox';
import MessageBox from '../helpers/MessageBox';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  getProducts,
  OrderByAnyItem,
  getFilterProductsGenres,
  getFilterProductsType,
  getFilterProductsState,
} from '../redux/actions/Products';
import Paging from '../components/Paging';
import { Form, Button, FloatingLabel, Container } from 'react-bootstrap';

export default function ProductsAdmin() {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const allLoading = useSelector((state) => state.loading);
  const allErrors = useSelector((state) => state.error);
  const allProducts = useSelector((state) => state.products.products);
  const [orden, setOrden] = useState('');

  // Paginación
  let productsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const indexLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexLastProduct - productsPerPage;

  //Productos para renderizar //Productos actualmente en la página
  const currentProducts = allProducts.slice(
    indexOfFirstProduct,
    indexLastProduct
  );

  const showProducts = (event) => {
    setCurrentPage(event.selected + 1);
  };

  function handleFilterProducts(e) {
    e.preventDefault();
    if (e.target.value === 'Todos') {
      dispatch(getProducts());
    } else if (e.target.value === 'Hombre' || e.target.value === 'Mujer') {
      dispatch(getFilterProductsGenres(e.target.value));
    } else if (e.target.value === 'active' || e.target.value === 'inactive') {
      dispatch(getFilterProductsState(e.target.value));
    } else {
      dispatch(getFilterProductsType(e.target.value));
    }
    setOrden(`Ordered ${e.target.value}`);
    setCurrentPage(1);
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
    <Container>
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
            <tr>
              <th>
                <h3>Productos</h3>
              </th>
              <th>
                <Paging
                  productsPerPage={productsPerPage}
                  allProducts={allProducts.length}
                  showProducts={showProducts}
                />
              </th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th>
                <FloatingLabel controlId='floatingSelectGrid' label='Filtrar'>
                  <Form.Select onChange={(e) => handleFilterProducts(e)}>
                    <option value='Todos'>Todos</option>
                    <optgroup label='Tipo'>
                      <option value='Camiseta'>Camisetas</option>
                      <option value='Pantaloneta'>Pantalonetas</option>
                      <option value='Conjunto'>Conjuntos</option>
                    </optgroup>

                    <optgroup label='Género'>
                      <option value='Hombre'>Hombre</option>
                      <option value='Mujer'>Mujer</option>
                    </optgroup>
                    <optgroup label='Estado'>
                      <option value='active'>Activo</option>
                      <option value='inactive'>Inactivo</option>
                    </optgroup>
                  </Form.Select>
                </FloatingLabel>
              </th>
              <th>
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
              </th>
            </tr>
          </thead>
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Inventario</th>
              <th>Género</th>
              <th>Tipo</th>
              <th>Promoción</th>
              <th>Estado</th>
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
            {!currentProducts ? (
              <LoadingBox />
            ) : (
              currentProducts.map((product) => (
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
                  <td>{product.type}</td>
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
    </Container>
  );
}
