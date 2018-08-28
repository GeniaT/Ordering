export const initOrders = (orders) => ({
  type: 'INIT_ORDERS',
  orders
})

export const updateOrder = (id, order) => ({
  type: 'UPDATE_ORDER',
  id,
  order
})
