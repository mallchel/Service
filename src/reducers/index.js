import { combineReducers } from 'redux';

import services from './services';
import cart from './cart';

const reducers = combineReducers({
  services,
  cart,
});

export default reducers;
