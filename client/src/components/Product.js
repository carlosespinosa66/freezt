import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Button, Image } from 'react-bootstrap';

import { addProductToCar } from '../redux/actions/Products';
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
          <Rating
            rating={product.rating}
            numReviews={product.numReviews}
          ></Rating>
          <Card.Text>${product.price}</Card.Text>
          {product.stock === 0 ? (
            <Button variant='light' disabled>
              Sin Inventario
            </Button>
          ) : (
            <Button onClick={() => addToCartHandler(product)}>Comprar</Button>
          )}
        </Card.Body>
      </div>
    </Card>
  );
}
