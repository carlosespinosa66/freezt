import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';
import { getError } from '../helpers/utils';
import { regPaypalOrder } from '../actions';

export default function PayPalCheckoutButtons(props) {
    const dispatch = useDispatch();
    const navigateTo = useNavigate();
    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
    const { order } = props;
    const [paidFor, setPaidFor] = useState(false);

    function createOrder(data, actions) {
        return actions.order
            .create({
                purchase_units: [
                    {
                        amount: { value: order.totalPrice },
                    },
                ],
            });
    }

    function handleAprove(orderID) {
        // Action to update the order with the data returned
        dispatch(regPaypalOrder(order.id, orderID));
        //if response is success

        setPaidFor(true);

        //Refresh user's account or suscription status

        //if the response us an error
        //Alert with the right response.
    }

    if (paidFor) {
        // display success message, modal or redirect to the succes pag
        toast.error("Thank you for your purchase");
    }
    
    const onApprove = async (data, actions) => {
        try {
            const order = await actions.order.capture();
            handleAprove(data.orderID);
        } catch (err) {
            toast.error(getError(err));
        }
    };

    function onCancel() {
        toast.error("The action was canceled !!");
    }

    function onError(err) {
        toast.error(err.message);
    }

    const loadPayPalScript = async (clientId) => {

        paypalDispatch({
            type: 'resetOptions',
            value: {
                'client-id': clientId,
                currency: 'USD',
            },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
    };

    useEffect(() => {
        loadPayPalScript(process.env.REACT_APP_PAYPAL_CLIENT_ID);
    }, [loadPayPalScript]);

    return (
        <PayPalButtons
            style={{
                // color: "silver",
                layout: "vertical",
                height: 48,
                tagline: false,
                shape: "",
                label: "buynow"
            }}
            createOrder={createOrder}
            onApprove={onApprove}
            onCancel={onCancel}
            onError={onError}
        />
    );
}

