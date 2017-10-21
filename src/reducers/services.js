const services = (state = {}, action) => {
  switch (action.type) {
    case 'REQUEST_SERVICES':
      return { ...state, 'isFetching': true };
    case 'RECEIVE_SERVICES':
      return {
        ...state,
        'isFetching': false,
        'categories': action.categories
      };
    case 'REQUEST_SERVICES_FAILED':
      return {
        ...state,
        'isFetching': false,
        'failed': true
      };
    default:
      return state;
  }
}

export default services;
