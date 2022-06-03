const initialState = {
  loading: false,
  error: '',
  users: [],
  userDetail: [],
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADMIN_GET_USERS':
      return { ...state, users: action.payload };

    case 'ADMIN_GET_USER_INFO':
      return { ...state, userDetail: action.payload };

    case 'USER_SIGNIN':
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
      return { ...state, userInfo: action.payload, loading: false, error: '' };

    case 'USER_SIGNUP':
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
      return {
        ...state,
        userInfo: action.payload,
        loading: false,
        error: '',
      };

    case 'USER_ADMIN_UPDATE_SUCCESS':
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
      return {
        ...state,
        loading: false,
        error: '',
      };

    case 'USER_PROFILE_UPDATE_SUCCESS':
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
      return {
        ...state,
        userInfo: action.payload,
        loading: false,
        error: '',
      };

    case 'USER_SIGN_OUT':
      localStorage.removeItem('userInfo');
      return {
        ...state,
        loading: false,
        error: '',
        userInfo: null,
        users: [],
        userDetail: [],
      };

    case 'USER_RESET_STATE':
      localStorage.removeItem('userInfo');
      return { ...state, userInfo: null, loading: false, error: '' };

    case 'USER_SIGNIN_FAIL':
      localStorage.removeItem('userInfo');
      return {
        ...state,
        userInfo: null,
        loading: false,
        error: action.payload,
      };

    case 'USER_RESET_DETAIL':
      return {
        ...state,
        userDetail: [],
        loading: false,
        error: '',
      };

    default:
      return state;
  }
};
