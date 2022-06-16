import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../helpers/LoadingBox';
import MessageBox from '../helpers/MessageBox';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers } from '../redux/actions/Users';
import { Container, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getError } from '../helpers/utils';
import Paging from '../components/Paging';

export default function OrderHistoryScreen() {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const allLoading = useSelector((state) => state.loading);
  const allErrors = useSelector((state) => state.error);
  const token = useSelector((state) => state.userInfo.userInfo.token);
  const allUsers = useSelector((state) => state.userInfo.users);

  // Paginación
  let usersPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const indexLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexLastUser - usersPerPage;

  //Productos para renderizar //Productos actualmente en la página
  const currentUsers = allUsers.slice(indexOfFirstUser, indexLastUser);

  const showUsers = (event) => {
    setCurrentPage(event.selected + 1);
  };

  useEffect(() => {
    try {
      dispatch(getAllUsers(token));
    } catch (err) {
      toast.error(getError(err));
    }
  }, [getAllUsers, token]);

  return (
    <Container>
      <Helmet>
        <title>Administrar Usuarios</title>
      </Helmet>
      {allLoading ? (
        <LoadingBox></LoadingBox>
      ) : allErrors ? (
        <MessageBox variant='danger'>{allErrors}</MessageBox>
      ) : (
        <table className='table'>
          <thead>
            <tr>
              <th>
                <h2>Usuarios</h2>
              </th>
              <th>
                <Paging
                  productsPerPage={usersPerPage}
                  allProducts={allUsers.length}
                  showProducts={showUsers}
                />
              </th>
            </tr>
          </thead>
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
            {!currentUsers ? (
              <LoadingBox></LoadingBox>
            ) : (
              currentUsers.map((user) => (
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
