import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
// import { womenProducts } from '../actions';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


// import WomenProduct from '../components/WomenProduct';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function MenClothes() {
    const dispatch = useDispatch();
    const allProducts = useSelector((state) => state.womenproducts);
    const allLoading = useSelector((state) => state.loading);
    const allErrors = useSelector((state) => state.error);

    useEffect(() => {
        // dispatch(womenProducts());
    }, [dispatch]);

    return (
        <div>
            <Helmet>
                <title>Women Sport Clothing</title>
            </Helmet>
            <h1>Featured Products</h1>
            {/* <div className="products">
                {allLoading ? (<LoadingBox/>
                ) : 
                allErrors.message ? (<MessageBox variant="danger">{allErrors.message}</MessageBox>
                ) : 
                (
                    <Row>
                        {allProducts.map(product => (
                            <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                                <WomenProduct product={product}></WomenProduct>
                            </Col>
                        ))}
                    </Row>
                )}
            </div> */}
        </div>
    );
}
