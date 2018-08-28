import ordersReducer from './reducers';

test('Should set the default state before any manual action', () => {
  const action = {type: '@@INIT'};
  const state = ordersReducer(undefined, action);
  expect(state).toEqual([]);
});

test('Should set in state the orders passed as argument', () => {
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
  const action = {type: 'INIT_ORDERS', orders};
  const state = ordersReducer(orders, action);
  expect(state).toEqual(orders);
});

test('Should update an order based on its ID and leave the rest unchanged', () => {
  const initialState = [
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
  ];
  const order = {
    "id": "2",
    "customer-id": "2",
    "items": [
      {
        "product-id": "A101",
        "quantity": "10",
        "unit-price": "9.75",
        "total": "97.50"
      }
    ],
    "total": "97.50"
  };
  const action = {type: 'UPDATE_ORDER', id: "2", order};
  const state = ordersReducer(initialState, action);
  const result = [
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
          "quantity": "10",
          "unit-price": "9.75",
          "total": "97.50"
        }
      ],
      "total": "97.50"
    }
  ];
  expect(state).toEqual(result);
});
