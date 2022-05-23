import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../helpers/LoadingBox';
import MessageBox from '../helpers/MessageBox';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers } from '../redux/actions/Users';
import { Container,Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getError } from '../helpers/utils';

export default function OrderHistoryScreen() {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const allLoading = useSelector((state) => state.loading);
  const allErrors = useSelector((state) => state.error);
  const allUserInfo = useSelector((state) => state.userInfo.userInfo.token);
  const allUsers = useSelector((state) => state.userInfo.users);

  useEffect(() => {
    try {
      dispatch(getAllUsers(allUserInfo));
    } catch (err) {
      toast.error(getError(err));
    }
  }, [getAllUsers, allUserInfo]);

  return (
    <Container>
      <Helmet>
        <title>Administrar Usuarios</title>
      </Helmet>
      <h2>Administrar Usuarios</h2>
      {allLoading ? (
        <LoadingBox></LoadingBox>
      ) : allErrors ? (
        <MessageBox variant='danger'>{allErrors}</MessageBox>
      ) : (
        <table className='table'>
          <thead> </thead>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>
                <Button
                  type='button'
                  variant='secondary'
                  onClick={() => {
                    navigateTo('/usersadd');
                  }}
                >
                  Adicionar
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {!allUsers ? (
              <LoadingBox></LoadingBox>
            ) : (
              allUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    {user.name} {user.surname}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.isActive ? 'Activo' : 'Desactivado'}</td>
                  <td>
                    <Button
                      type='button'
                      variant='secondary'
                      onClick={() => {
                        navigateTo(`/useradminedit/${user.id}`);
                      }}
                    >
                      Modificar
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </Container>
  );
}
