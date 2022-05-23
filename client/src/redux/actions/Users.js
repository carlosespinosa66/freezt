import axios from 'axios';

export function getUserInfo(email, password, cb) {
  return async function(dispatch) {
    try {
      const response = await axios.post('/api/signIn', { email, password });
      const TOKEN = response.headers['auth-token'];
      if (response.status === 200) {
        dispatch({
          type: 'USER_SIGNIN',
          payload: {
            email,
            token: TOKEN,
            name: response.data.data.name,
            role: response.data.data.role,
            surname: response.data.data.surname,
            billing_address: response.data.data.billing_address,
            default_shipping_address:
              response.data.data.default_shipping_address,
            google: false,
          },
        });
        cb(null);
      } else {
        cb(response.data.errorMsg);
      }
    } catch (error) {
      cb(error.response.status.toString());
    }
  };
}

export const getAllUsers = (token) => {
  return async (dispatch) => {
    try {
      const allUsers = await axios.get('/api/admin/users', {
        headers: {
          'auth-token': token,
        },
      });
      return dispatch({
        type: 'ADMIN_GET_USERS',
        payload: allUsers.data.data,
      });
    } catch (error) {
      dispatch({
        type: 'ADMIN_GET_USERS_FAIL',
        payload: { status: error.response.status },
      });
    }
  };
};

export const getUserEditInfo = (id, token) => {
  return async (dispatch) => {
    try {
      const allUsers = await axios.get(`/api/admin/users/${id}`, {
        headers: {
          'auth-token': token,
        },
      });
      return dispatch({
        type: 'ADMIN_GET_USER_INFO',
        payload: allUsers.data.data,
      });
    } catch (error) {
      dispatch({
        type: 'ADMIN_GET_USER_FAIL',
        payload: { status: error.response.status },
      });
    }
  };
};

export function regUserInfo(name, email, password) {
  return async function(dispatch) {
    try {
      const { data } = await axios.post('api/auth/users/signup', {
        name,
        email,
        password,
      });
      dispatch({
        type: 'USER_SIGNUP',
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: 'USER_SIGNUP_FAIL',
        payload: { status: error.response.status },
      });
    }
  };
}

export function updateUserInfo(user, token) {
  return async function(dispatch) {
    try {
      const { data } = await axios.put('api/auth/users', user, {
        headers: {
          'auth-token': token,
        },
      });
      dispatch({
        type: 'USER_UPDATE_SUCCESS',
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: 'USER_UPDATE_FAIL',
        payload: { status: error.response.status },
      });
    }
  };
}

export function putUserSignOut() {
  return {
    type: 'USER_SIGN_OUT',
    payload: '',
  };
}

export function putUserReset() {
  return {
    type: 'USER_RESET_STATE',
    payload: '',
  };
}
