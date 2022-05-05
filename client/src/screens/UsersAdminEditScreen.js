import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserInfo,getUserEditInfo } from '../actions/Users';
import { Form, Row, Col, Card, Button, InputGroup } from 'react-bootstrap';

export default function UsersAdminEdit() {
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { id } = useParams();
  const allUserInfo = useSelector((state) => state.userInfo);
  const allUserDetail = useSelector((state) => state.userDetail);


  const [input, setInput] = useState({
    name: '',
    surname: '',
    email: '',
    billing_address: '',
    default_shipping_address: '',
    role: '',
    signedInWithGoogle: '',
    isActive: '',
    needsPasswordReset: '',
  });

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      dispatch(updateUserInfo(input, allUserInfo.token));
      navigateTo('/productsadmin');
    }
    setValidated(true);
  };

  const handleInputChange = function(e) {
    if (e.target.type === 'checkbox') {
      setInput({
        ...input,
        [e.target.name]: e.target.checked,
      });
    } else if (e.target.type === 'file') {
      input.image = e.target.value;
    } else {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }
  };

  useEffect(() => {
    const showEditData = () => {
      setInput({
        name: allUserInfo.name,
        surname: allUserInfo.surname,
        email: allUserInfo,
        billing_address: allUserInfo.billing_address,
        default_shipping_address: allUserInfo.default_shipping_address,
        role: allUserInfo.role,
        signedInWithGoogle: allUserInfo.signedInWithGoogle,
        isActive: allUserInfo.isActive,
        needsPasswordReset: allUserInfo.needsPasswordReset,
      });
    };


    if (allUserDetail.length <= 0) {
      dispatch(getUserEditInfo(id,allUserInfo.token));
    }
    showEditData()

  }, [getUserEditInfo,allUserInfo]);

  return (
    <div>
      <Helmet>
        <title>Modificar Usuarios</title>
      </Helmet>
      <h1>Modificar Usuarios</h1>
    </div>
  );
}
