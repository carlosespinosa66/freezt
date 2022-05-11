import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { addProductToCar } from '../actions/Products';
import Rating from '../helpers/Rating';
import { toast } from 'react-toastify';

export default function Product(props) {
  const { product } = props;
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const allCart = useSelector((state) => state.cart.cart);
  const allProducts = useSelector((state) => state.products.products);
  function addToCartHandler() {
    const itemToAdd = allCart.cartItems.find((x) => x.id === product.id);
    const quantity = itemToAdd ? itemToAdd.quantity + 1 : 1;
    const itemToVerifyQty = allProducts.find((x) => x.id === product.id);
    if (Number(quantity) <= Number(itemToVerifyQty.stock)) {
      dispatch(addProductToCar({ ...product, quantity }));
    } else {
      toast.info("There isn't stock available", { position: 'top-center' });
      // window.alert("No hay inventario del producto");
    }
  }

  return (
    <Card >
      <div className='product' key={product.id}>
        <Link to={`/products/${product.id}`}>
          <img
            src={product.image}
            className='card-img-top'
            alt={product.name}
          />
        </Link>
        <Card.Body>
          <Link to={`/products/${product.id}`}>
            <Card.Title>{product.name}</Card.Title>
          </Link>
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
          <Button 
            onClick={() => {
              navigateTo(`/productedit/${product.id}`);
            }}
          >
            Editar
          </Button>
        </Card.Body>
      </div>
    </Card>
  );
}
