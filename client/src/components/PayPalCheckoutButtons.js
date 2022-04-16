import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';
import { getError } from '../helpers/utils';
import { regPaypalOrder } from '../actions';

export default function PayPalCheckoutButtons(props) {
    const dispatch = useDispatch();
    const [paypalDispatch] = usePayPalScriptReducer();
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

    const loadPayPalScript = (clientId) => {
        try {
            paypalDispatch({
                type: 'resetOptions',
                value: {
                    // 'client-id': clientId,
                    'client-id': "AXZqDsuO89YYQ2p3NYf3lHQqmXQiOWSZNegW8N-X71x9tRlUZJUvIRGdaerB7XjJPK20nHRHCNrySJv5",
                    currency: 'USD',
                },
            });
            paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
        } catch (err) {
            toast.error(getError(err));
        }

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

