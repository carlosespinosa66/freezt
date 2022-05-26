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
            shipping_address: response.data.data.shipping_address,
            billing_address: response.data.data.billing_address,
            shipping_address: response.data.data.shipping_address,
            shipping_city_id: response.data.data.shipping_city_id,
            shipping_citiy_name:response.data.data.shipping_city_name,
            shipping_country_name:response.data.data.shipping_country_name,
            shipping_country_id: response.data.data.shipping_country_id,
            shipping_postalcode: response.data.data.shipping_postalcode,
            billing_city_id: response.data.data.billing_city_id,
            billing_city_name:response.data.data.billing_city_name,
            billing_country_id: response.data.data.billing_country_id,
            billing_country_name:response.data.data.billing_country_name,
            billing_postalcode: response.data.data.billing_postalcode,
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
      const { data } = await axios.put('api/auth/users/admin', user, {
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
        payload:  {
          token: TOKEN,
          email:response.data.data.email,
          name: response.data.data.name,
          role: response.data.data.role,
          surname: response.data.data.surname,
          billing_address: response.data.data.billing_address,
          shipping_address: response.data.data.shipping_address,
          billing_address: response.data.data.billing_address,
          shipping_address: response.data.data.shipping_address,
          shipping_city_id: response.data.data.shipping_city_id,
          shipping_city_name:response.data.data.shipping_city_name,
          shipping_country_name:response.data.data.shipping_country_name,
          shipping_country_id: response.data.data.shipping_country_id,
          shipping_postalcode: response.data.data.shipping_postalcode,
          billing_city_id: response.data.data.billing_city_id,
          billing_city_name:response.data.data.billing_city_name,
          billing_country_id: response.data.data.billing_country_id,
          billing_country_name:response.data.data.billing_country_name,
          billing_postalcode: response.data.data.billing_postalcode,
          google: false,
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
