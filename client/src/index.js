import React from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from "react-redux";
import { store } from "./store/index";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import reportWebVitals from './reportWebVitals';


const initialOptions = {
  // "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
  currency: "USD",
  intent: "capture",
};



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        {/* <PayPalScriptProvider deferLoading={true} options={initialOptions}> */}
        <PayPalScriptProvider  deferLoading={true} options={{ "client-id": "sb" }}>          
          
          <App />
        </PayPalScriptProvider>
      </HelmetProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();






