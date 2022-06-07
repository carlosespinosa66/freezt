import React from 'react';
import { Helmet } from 'react-helmet-async';
import {Form, Button,Container} from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { registerUser } from '../redux/actions/Users'; //putUserReset
import { getError } from '../helpers/utils';


export default function SignupScreen() {
    const dispatch = useDispatch();
    const navigateTo = useNavigate();
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const allUserInfo = useSelector((state) => state.userInfo.userInfo);
    // const allErrors = useSelector((state) => state.error);

    function submitHandler(e) {
        e.preventDefault();

        try {
            if (password !==confirmPassword) {
                toast.error('Password do not match')
            } else {

                dispatch(registerUser(name, email, password));
                navigateTo(redirect || '/');
            }

        } catch (err) {
            toast.error(getError(err));
        }
    }

    useEffect(() => {
        if (allUserInfo) {
            navigateTo(redirect);
        }
    }, [navigateTo, redirect, allUserInfo]);

    return (
        <Container className="small-container">
            <Helmet>
                <title>Registro</title>
            </Helmet>
            <h1 className='my-3'>Registro</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className='mb-3' controlId="name">
                    <Form.Label>Nombre </Form.Label>
                    <Form.Control onChange={(e) => setName(e.target.value)} required />
                </Form.Group>

                <Form.Group className='mb-3' controlId="email">
                    <Form.Label>Correo </Form.Label>
                    <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} required />
                </Form.Group>
                <Form.Group className='mb-3' controlId="password" >
                    <Form.Label>Clave</Form.Label>
                    <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} required />
                </Form.Group >
                <Form.Group className='mb-3' controlId="confirmpassword">
                    <Form.Label>Confirmar clave </Form.Label>
                    <Form.Control type="password" onChange={(e) => setConfirmPassword(e.target.value)} required />
                </Form.Group>

                <div className='mb-3'>
                    <Button type="submit">Registro</Button>
                </div>
                <div className='mb-3'>
                    Ya se encuentra registrado ? {'  '}
                    <Link to={`/signin?redirect=${redirect}`}>Ingreso</Link>
                </div>
            </Form>
        </Container >
    );
}
