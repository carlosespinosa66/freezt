import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../helpers/LoadingBox';
import MessageBox from '../helpers/MessageBox';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers } from '../actions/Users';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getError } from '../helpers/utils';

export default function OrderHistoryScreen() {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const allLoading = useSelector((state) => state.loading);
  const allErrors = useSelector((state) => state.error);
  const allUserInfo = useSelector((state) => state.userInfo.token);
  const allUsers = useSelector((state) => state.users);

  useEffect(() => {
    try {
      dispatch(getAllUsers(allUserInfo));
    } catch (err) {
      toast.error(getError(err));
    }
  }, [getAllUsers, allUserInfo]);

  return (
    <div>
      <Helmet>
        <title>Administrar Usuarios</title>
      </Helmet>
      <h1>Administrar Usuarios</h1>
      {allLoading ? (
        <LoadingBox></LoadingBox>
      ) : allErrors ? (
        <MessageBox variant='danger'>{allErrors}</MessageBox>
      ) : (
        <table className='table'>
          <thead>
            <tr>
              <th>Correo</th>
              <th>Nombre</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {!allUsers ? (
              <LoadingBox></LoadingBox>
            ) : (
              allUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.email}</td>
                  <td>
                    {user.name} {user.surname}
                  </td>
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
                      Details
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
