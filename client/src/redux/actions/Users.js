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
            isActive: response.data.data.isActive,
            phone:response.data.data.phone,
            needsPasswordReset: response.data.data.needsPasswordReset,
            signedInWithGoogle: false,
            shipping_address: response.data.data.shipping_address,
            shipping_city_id: response.data.data.shipping_city_id,
            shipping_city_name: response.data.data.shipping_city_name,
            shipping_country_name: response.data.data.shipping_country_name,
            shipping_country_id: response.data.data.shipping_country_id,
            shipping_postalcode: response.data.data.shipping_postalcode,

          },
        });
        cb(null, TOKEN);
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

export const getUserEditInfoAdmin = (id, token) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/admin/users/${id}`, {
        headers: {
          'auth-token': token,
        },
      });
      return dispatch({
        type: 'ADMIN_GET_USER_INFO',
        payload: {
          id: response.data.data.id,
          email: response.data.data.email,
          name: response.data.data.name,
          role: response.data.data.role,
          surname: response.data.data.surname,
          isActive: response.data.data.isActive,
          needsPasswordReset: response.data.data.needsPasswordReset,
          phone:response.data.data.phone,
          shipping_address: response.data.data.shipping_address,
          shipping_city_id: response.data.data.shipping_city_id,
          shipping_city_name: response.data.data.shipping_city_name,
          shipping_country_name: response.data.data.shipping_country_name,
          shipping_country_id: response.data.data.shipping_country_id,
          shipping_postalcode: response.data.data.shipping_postalcode,
          signedInWithGoogle: false,
        },
      });
    } catch (error) {
      dispatch({
        type: 'ADMIN_GET_USER_FAIL',
        payload: { status: error.response.status },
      });
    }
  };
};

export function registerUser(user) {
  return async function(dispatch) {
    try {
      const newUser = await axios.post('api/auth/users/signup', user);
      dispatch({
        type: 'USER_SIGNUP',
        payload: newUser.data,
      });
    } catch (error) {
      dispatch({
        type: 'USER_SIGNUP_FAIL',
        payload: { status: error.response.status },
      });
    }
  };
}

export function regUserInfoAdmin(user,token) {
  return async function(dispatch) {
    try {
      const newUser = await axios.post('api/admin/users', user,{
        headers: {
          'auth-token': token,
        },
      });
      dispatch({
        type: 'USER_ADMIN_ADDITION',
        payload: newUser.data,
      });
    } catch (error) {
      dispatch({
        type: 'USER_ADMIN_ADDITION_FAIL',
        payload: { status: error.response.status },
      });
    }
  };
}

export function updateUserInfoAdmin(user, token) {
  return async function(dispatch) {
    try {
      const { data } = await axios.put('/api/admin/users', user, {
        headers: {
          'auth-token': token,
        },
      });
      dispatch({
        type: 'USER_ADMIN_UPDATE_SUCCESS',
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: 'USER_ADMIN_UPDATE_FAIL',
        payload: { status: error.response.status },
      });
    }
  };
}

export function updateUserProfile(user, token) {
  return async function(dispatch) {
    try {
      const response = await axios.put('api/auth/users/profile', user, {
        headers: {
          'auth-token': token,
        },
      });
      const TOKEN = response.headers['auth-token'];
      dispatch({
        type: 'USER_PROFILE_UPDATE_SUCCESS',
        payload: {
          token: TOKEN,
          email: response.data.data.email,
          name: response.data.data.name,
          role: response.data.data.role,
          surname: response.data.data.surname,
          isActive: response.data.data.isActive,
          phone:response.data.data.phone,
          needsPasswordReset: response.data.data.needsPasswordReset,
          shipping_address: response.data.data.shipping_address,
          shipping_city_id: response.data.data.shipping_city_id,
          shipping_city_name: response.data.data.shipping_city_name,
          shipping_country_name: response.data.data.shipping_country_name,
          shipping_country_id: response.data.data.shipping_country_id,
          shipping_postalcode: response.data.data.shipping_postalcode,
          signedInWithGoogle: false,
        },
      });
    } catch (error) {
      dispatch({
        type: 'USER_PROFILE_UPDATE_FAIL',
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

export function resetUserDetail() {
  return {
    type: 'USER_RESET_DETAIL',
    payload: '',
  };
}
