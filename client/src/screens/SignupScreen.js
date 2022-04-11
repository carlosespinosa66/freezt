import React from 'react';
import Container from 'react-bootstrap/Container';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { regUserInfo } from '../actions'; //putUserReset
import { getError } from '../utils';


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
    const allUserInfo = useSelector((state) => state.userInfo);
    // const allErrors = useSelector((state) => state.error);

    function submitHandler(e) {
        e.preventDefault();

        try {
            if (password !==confirmPassword) {
                toast.error('Password do not match')
            } else {

                dispatch(regUserInfo(name, email, password));
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
                <title>Sign In</title>
            </Helmet>
            <h1 className='my-3'>Sign Up</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className='mb-3' controlId="name">
                    <Form.Label>Name </Form.Label>
                    <Form.Control onChange={(e) => setName(e.target.value)} required />
                </Form.Group>

                <Form.Group className='mb-3' controlId="email">
                    <Form.Label>Email </Form.Label>
                    <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} required />
                </Form.Group>
                <Form.Group className='mb-3' controlId="password" >
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} required />
                </Form.Group >
                <Form.Group className='mb-3' controlId="confirmpassword">
                    <Form.Label>Confirm Password </Form.Label>
                    <Form.Control type="password" onChange={(e) => setConfirmPassword(e.target.value)} required />
                </Form.Group>

                <div className='mb-3'>
                    <Button type="submit">Sign Up</Button>
                </div>
                <div className='mb-3'>
                    Already have an account ? {'  '}
                    <Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
                </div>
            </Form>
        </Container >
    );
}
