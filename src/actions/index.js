import fetch from 'isomorphic-fetch'

function status(response) {
  if (!response.ok) {
    return Promise.reject(new Error(response.status));
  } else {
    return Promise.resolve(response.json());
  }
}

export const requestServices = () => ({
  type: 'REQUEST_SERVICES',
});

export const receiveServices = (json) => ({
  type: 'RECEIVE_SERVICES',
  categories: json,
  receivedAt: Date.now(),
});

export const requestServicesFailed = () => ({
  type: 'REQUEST_SERVICES_FAILED',
});

export const fetchServices = () => dispatch => {
  dispatch(requestServices());
  return fetch('https://mallchel.glitch.me/getServices', {
    mode: 'cors'
  })
    .then(status)
    .then(json => dispatch(receiveServices(json)))
    .catch(error => dispatch(requestServicesFailed()));
}

export const setToCart = (item) => ({
  type: 'SETTOCART',
  item: item,
});

export const deleteFromCart = (item) => ({
  type: 'DELETEFROMCART',
  item: item,
});

export const setDateToCart = (date) => ({
  type: 'SETDATETOCART',
  date: date,
});
