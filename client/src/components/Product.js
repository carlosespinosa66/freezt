import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Button, Image } from 'react-bootstrap';
import { addProductToCar } from '../redux/actions/Cart';
import Rating from '../helpers/Rating';
import { toast } from 'react-toastify';

export default function Product(props) {
  const { product } = props;
  const dispatch = useDispatch();
  const allCart = useSelector((state) => state.cart.cart);
  const allProducts = useSelector((state) => state.products.products);
  function addToCartHandler() {
    const itemToAdd = allCart.cartItems.find((x) => x.id === product.id);
    const quantity = itemToAdd ? itemToAdd.quantity + 1 : 1;
    const itemToVerifyQty = allProducts.find((x) => x.id === product.id);
    if (Number(quantity) <= Number(itemToVerifyQty.stock)) {
      dispatch(addProductToCar({ ...product, quantity }));
    } else {
      toast.info("No hay inventario disponible.", { position: 'top-center' });
    }
  }

  return (
    <Card>
      <div className='product' key={product.id}>
        <div className='col-12 thumbnail' key={product.id}>
          <Link to={`/products/${product.id}`}>
            <div>
              <Image
                src={product.image}
                className='w-100 fluid picture1'
                alt={product.name}
              />
            </div>
            <div>
              <Image
                src={product.imagesec}
                className='w-100 fluid picture2'
                alt={product.name}
              />
            </div>
          </Link>
        </div>
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          {/* <Rating
            rating={product.rating}
            numReviews={product.numReviews}
          ></Rating> */}
          <Card.Text>${product.price}</Card.Text>
          {product.stock === 0 ? (
            <Button variant='light' disabled>
              Sin Inventario
            </Button>
          ) : (''
            // <Button onClick={() => addToCartHandler(product)}>Comprar</Button>
          )}
        </Card.Body>
      </div>
    </Card>
  );
}


{/* <Col className='col-12 col-lg-2 bg-secondary bg-opacity-10'>
<Row className='p-2 '>
  <Form.Label>Imagen</Form.Label>
  <Form.Group controlId='image'>
    <Figure className='p-2'>
      <Figure.Image
        src={input.image}
        height={150}
        width={150}
        className='d-inline-block border border-secondary '
        alt='Foto Producto'
      />
      <Figure.Caption></Figure.Caption>
    </Figure>
  </Form.Group>
  <Form.Group controlId='formFile'>
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

<Col className='col-12 col-lg-2 bg-secondary bg-opacity-10'>
<Row className='p-2 '>
  <Form.Group controlId='formFile'>
    <Form.Label>Imagen Secundaria</Form.Label>
  <Form.Group controlId='imagesec'>
    <Figure className='p-2'>
      <Figure.Image
        src={input.imagesec}
        height={150}
        width={150}
        className='d-inline-block border border-secondary'
        alt='Foto Producto'
      />
    </Figure>
  </Form.Group>
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
</Col> */}



