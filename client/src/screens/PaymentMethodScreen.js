import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import CheckoutSteps from '../helpers/CheckoutSteps';
import {Form, Button} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getError } from '../helpers/utils';
import { savePaymentMethod } from '../actions';

export default function PaymentMethodScreen() {
    const dispatch = useDispatch();
    const allShipping = useSelector((state) => state.cart.shippingAddress);
    const allPayment = useSelector((state) => state.cart.paymentMethod);
    const [paymentMethodName, setPaymentMethod] = useState(allPayment || 'PayPal');
    const navigateTo = useNavigate();

    function submitHandler(e) {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethodName))
        navigateTo('/placeorder')
        try {
        } catch (err) {
            toast.error(getError(err));
        }
    }

    useEffect(() => {
        if (!allShipping.address) {
            navigateTo("/shipping");
        }
    }, [allShipping,navigateTo]);

    return (
        <div>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <div className='container small-container'>
                <Helmet>
                    <title>Payment Method</title>
                </Helmet>
                <h1 className='my-3'>Payment Method</h1>

            <Form onSubmit={submitHandler}>
                <div className='mb-3'>
                    <Form.Check
                        type='radio'
                        id="PayPal"
                        label="PayPal"
                        value="PayPal"
                        checked={paymentMethodName === "PayPal"}
                        onChange={(e) => setPaymentMethod(e.target.value)} />
                </div>
                <div className='mb-3'>
                    <Form.Check
                        type='radio'
                        id="Stripe"
                        label="Stripe"
                        value="Stripe"
                        checked={paymentMethodName === "Stripe"}
                        onChange={(e) => setPaymentMethod(e.target.value)} />
                </div>
                <Button type="submit" onClick={submitHandler} variant="primary">
                    Continue
                </Button>
            </Form>
            </div>
        </div>
    );
}
