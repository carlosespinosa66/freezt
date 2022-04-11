import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from '../helpers/Rating';

export default function WomenProduct(props) {
    const { product } = props;
    return (
        <Card>
            <div className="product" key={product.slug}>
                <Link to={`/product/women/${product.slug}`}>
                    <img src={product.image} className="card-img-top" alt={product.name} />
                </Link>
                <Card.Body>
                    <Link to={`/product/women/${product.slug}`}>
                        <Card.Title>{product.name}</Card.Title>
                    </Link>
                    <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
                    <Card.Text>${product.price}</Card.Text>
                    <Button btn-primary>Add to Cart</Button>
                </Card.Body>
            </div>
        </Card>
    );
}
