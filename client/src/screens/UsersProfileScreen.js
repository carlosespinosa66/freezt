import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { Form, Button, Row, Col } from 'react-bootstrap';



import { toast } from 'react-toastify';



// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'UPDATE_REQUEST':
//       return { ...state, loadingUpdate: true };
//     case 'UPDATE_SUCCESS':
//       return { ...state, loadingUpdate: false };
//     case 'UPDATE_FAIL':
//       return { ...state, loadingUpdate: false };

//     default:
//       return state;
//   }
// };

export default function UsersProfile() {
  // const { state, dispatch: ctxDispatch } = useContext(Store);
  const allUserInfo = useSelector((state) => state.userInfo);
  const [validated, setValidated] = useState(false);

  // const [name, setName] = useState(userInfo.name);
  // const [email, setEmail] = useState(userInfo.email);
  // const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');

  // const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
  //   loadingUpdate: false,
  // });

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      // dispatch(updateProduct(input, allUserInfo.token));
      // navigateTo('/productsadmin');
    }
    setValidated(true);
  };


  const submitHandler = async (e) => {
    e.preventDefault();
    // try {
    //   const { data } = await axios.put(
    //     '/api/users/profile',
    //     {
    //       name,
    //       email,
    //       password,
    //     },
    //     {
    //       headers: { Authorization: `Bearer ${userInfo.token}` },
    //     }
    //   );
    //   dispatch({
    //     type: 'UPDATE_SUCCESS',
    //   });
    //   ctxDispatch({ type: 'USER_SIGNIN', payload: data });
    //   localStorage.setItem('userInfo', JSON.stringify(data));
    //   toast.success('User updated successfully');
    // } catch (err) {
    //   dispatch({
    //     type: 'FETCH_FAIL',
    //   });
    //   toast.error(getError(err));
    // }
  };



  return (
    <div className='container small-container'>
      <Helmet>
        <title>Perfil del Usuario</title>
      </Helmet>
      <h1 className='my-3'>Perfil del Usuario</h1>
      <Form onSubmit={handleSubmit}>
        <Row className='mb-3'>
          <Form.Group as={Col} mb='5' controlId='name'>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              value={allUserInfo.name}
              // onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
        
          <Form.Group as={Col} mb='5' controlId='surname'>
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              value={allUserInfo.surname}
              // onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
        </Row>
        <Row className='mb-3'>
        <Form.Group as={Col}  controlId='name'>
          <Form.Label>Correo</Form.Label>
          <Form.Control
            type='email'
            value={allUserInfo.email}
            // onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        </Row>
        <Row className='mb-3'>
        <Form.Group as={Col}  controlId='shipping'>
          <Form.Label>Dirección de envío</Form.Label>
          <Form.Control
            type='text'
            value={allUserInfo.shipping_address}
            // onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} mb='5'  controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              // onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} mb='5' controlId='password'>
            <Form.Label>Confirmar Password</Form.Label>
            <Form.Control
              type='password'
              // onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
        </Row>
        
        <div className='mb-3'>
          <Button type='submit'>Actualizar</Button>
        </div>
      </Form>
    </div>
  );
}
