import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import {Form, Button} from 'react-bootstrap';
import { getError } from '../helpers/utils';
import { saveShippingAddress } from '../actions/Orders';
import CheckoutSteps from '../helpers/CheckoutSteps';

export default function ShippingAddress() {

    const allUserInfo = useSelector((state) => state.userInfo);
    const allShipping = useSelector((state) => state.cart.shippingAddress);
    const navigateTo = useNavigate();
    const dispatch = useDispatch();
    const [fullName, setFullName] = useState(allShipping.fullName || '');
    const [address, setAddress] = useState(allShipping.address || '');
    const [city, setCity] = useState(allShipping.city || '');
    const [country, setCountry] = useState(allShipping.country || '');

    function submitHandler(e) {
        e.preventDefault();

        try {
            dispatch(saveShippingAddress(fullName, address, city, country));
            navigateTo("/payment");
        } catch (err) {
            toast.error(getError(err));
        }
    }

    useEffect(() => {
        if (!allUserInfo) {
            navigateTo('/signin?redirect=/shipping');
        }
    }, [allUserInfo,navigateTo]);

    return (
        <div>
            <Helmet>
                <title>Shipping Address</title>
            </Helmet>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <div className='container small-container'>
                <h1 className='my-3'>Shipping Address</h1>
                <Form onSubmit={submitHandler}> </Form>
                <Form.Group className='mb-3' controlId="fullName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control value={fullName}
                        onChange={(e) => setFullName(e.target.value)} required />
                </Form.Group>
                <Form.Group className='mb-3' controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control value={address}
                        onChange={(e) => setAddress(e.target.value)} required />
                </Form.Group>
                <Form.Group className='mb-3' controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control value={city}
                        onChange={(e) => setCity(e.target.value)} required />
                </Form.Group>
                <Form.Group className='mb-3' controlId="country">
                    <Form.Label>Country</Form.Label>
                    <Form.Control value={country}
                        onChange={(e) => setCountry(e.target.value)} required />
                </Form.Group>
                <div className="mb-3">
                    <Button type="submit" onClick={submitHandler} variant="primary">
                        Continue
                    </Button>
                </div>
            </div>
        </div>
    );
}
