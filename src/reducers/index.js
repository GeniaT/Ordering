import { combineReducers } from 'redux';

export const initOrders = (orders) => ({
  type: 'INIT_ORDERS',
  orders
})
export const updateOrder = (id, order) => ({
  type: 'UPDATE_ORDER',
  id,
  order
})

const initialState = [];

export default function orders(state = initialState, action) {
  switch (action.type) {
    case 'INIT_ORDERS':
      return action.orders;
      break;
    case 'UPDATE_ORDER':
      state.forEach((ord, index) => {
        if (action.id === ord.id) {
          state[index] = action.order;
        }
      })
      return state;
      break;
    default:
      return state
  }
}

export const appReducer = combineReducers({
  orders,
});
