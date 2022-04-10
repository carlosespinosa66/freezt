import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { addProductToCar } from '../actions';
import Rating from './Rating';

export default function Product(props) {
    const { product } = props;
    const dispatch = useDispatch();
    const allCart = useSelector((state) => state.cart);
    const allProducts = useSelector((state) => state.products);
    function addToCartHandler() {

        const itemToAdd = allCart.cartItems.find((x) => x._id === product._id);
        const quantity = itemToAdd ? itemToAdd.quantity + 1 : 1;
        const itemToVerifyQty = allProducts.find((x) => x._id === product._id);
        if (Number(quantity) <= Number(itemToVerifyQty.countinstock)) {
            dispatch(addProductToCar({ ...product, quantity }));
        } else {
            window.alert("No hay inventario del producto");
        }
    }

    return (
        <Card>
            <div className="product" key={product.slug}>
                <Link to={`/products/${product.slug}`}>
                    <img src={product.image} className="card-img-top" alt={product.name} />
                </Link>
                <Card.Body>
                    <Link to={`/products/${product.slug}`}>
                        <Card.Title>{product.name}</Card.Title>
                    </Link>
                    <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
                    <Card.Text>${product.price}</Card.Text>
                    {product.countinstock === 0 ? <Button variant='light' disabled>Sin Inventario</Button>
                        :
                        <Button onClick={() => addToCartHandler(product)}>Add to Cart</Button>}
                </Card.Body>
            </div>
        </Card>
    );
}
