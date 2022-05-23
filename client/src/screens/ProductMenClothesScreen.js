import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getFilterProductsGenres } from '../redux/actions/Products';
import {Row, Col, Container} from 'react-bootstrap';

import Product from '../components/Product';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../helpers/LoadingBox';
import MessageBox from '../helpers/MessageBox';

export default function MenClothes() {
    const dispatch = useDispatch();
    const allProducts = useSelector((state) => state.products.products);
    const allLoading = useSelector((state) => state.products.loading);
    const allErrors = useSelector((state) => state.products.error);

    useEffect(() => {
        dispatch(getFilterProductsGenres('Hombre'));
    }, [dispatch]);

    return (
        <Container>
            <Helmet>
                <title>Productos Masculinos</title>
            </Helmet>
            <h2>Productos Masculinos</h2>
            <div className="products">
                {allLoading ? (<LoadingBox/>
                ) : 
                allErrors.message ? (<MessageBox variant="danger">{allErrors.message}</MessageBox>
                ) : 
                (
                    <Row>
                        {allProducts.map(product => (
                            <Col key={product.id} sm={6} md={4} lg={3} className="mb-3">
                                <Product product={product}></Product>
                            </Col>
                        ))}
                    </Row>
                )}
            </div>
        </Container>
    );
}
