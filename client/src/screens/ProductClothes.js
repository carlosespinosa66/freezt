import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from '../actions';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import Product from '../components/Product';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function ProductClothes() {
    const dispatch = useDispatch();
    const allProducts = useSelector((state) => state.products);
    const allLoading = useSelector((state) => state.loading);
    const allErrors = useSelector((state) => state.error);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    return (
        <div>
            <Helmet>
                <title>Men Sport Clothing</title>
            </Helmet>
            <h1>Featured Products</h1>
            <div className="products">
                {allLoading ? (<LoadingBox/>
                ) : 
                allErrors.message ? (<MessageBox variant="danger">{allErrors.message}</MessageBox>
                ) : 
                (
                    <Row>
                        {allProducts.map(product => (
                            <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                                <Product product={product}></Product>
                            </Col>
                        ))}
                    </Row>
                )}
            </div>
        </div>
    );
}
