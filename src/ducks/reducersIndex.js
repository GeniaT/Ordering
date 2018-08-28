import { combineReducers } from 'redux';
import orders from './orders/reducers';

export const appReducer = combineReducers({
  orders,
});
