export default (prevState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...prevState,
        user: action.user,
        userToken: action.token,
        isLoading: false,
      };

    case 'RETRIEVE_TOKEN':
      return {
        ...prevState,
        user: action.user,
        userToken: action.token,
        isLoading: false,
      };

    case 'LOGOUT':
      return {
        ...prevState,
        user: null,
        userToken: null,
        isLoading: false,
      };

    default:
      return prevState;
  }
};
