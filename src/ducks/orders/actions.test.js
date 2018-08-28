import { initOrders, updateOrder } from './actions';

test('should setup "INIT_ORDERS" action object', () => {
  const action = initOrders();
  const result = {type: 'INIT_ORDERS'};
  expect(action).toEqual(result);
});

test('should setup "INIT_ORDERS" action object with orders', () => {
  const orders = [
    {
      "id": "1",
      "customer-id": "1",
      "items": [
        {
          "product-id": "B102",
          "quantity": "10",
          "unit-price": "4.99",
          "total": "49.90"
        }
      ],
      "total": "49.90"
    },
    {
      "id": "2",
      "customer-id": "2",
      "items": [
        {
          "product-id": "A101",
          "quantity": "5",
          "unit-price": "9.75",
          "total": "48.75"
        }
      ],
      "total": "48.75"
    }
  ]
  const action = initOrders(orders);
  const result = {
    type: 'INIT_ORDERS',
    orders
  };
  expect(action).toEqual(result);
});

test('should setup "UPDATE_ORDER" action object', () => {
  const action = updateOrder();
  const result = {type: 'UPDATE_ORDER'};
  expect(action).toEqual(result);
});


test('should setup "UPDATE_ORDER" action object with id and order', () => {
  const order = {
    "id": "1",
    "customer-id": "1",
    "items": [
      {
        "product-id": "B102",
        "quantity": "10",
        "unit-price": "4.99",
        "total": "49.90"
      }
    ],
    "total": "49.90"
  }
  const action = updateOrder("9", order);
  const result = {type: 'UPDATE_ORDER', id:"9", order};
  expect(action).toEqual(result);
});
