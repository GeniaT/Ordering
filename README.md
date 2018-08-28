# React Redux Ordering app
## Used Stack
- React library for app composability
- Redux for state management


## Additional useful libraries:
Bundler: <a href="https://webpack.js.org/">Webpack</a><br>
Testing: <a href="https://facebook.github.io/jest/">Jest</a>

## Main features:
- Display orders in the main page that come from a folder and in the future may come from an API.
- Possibility to simulate an order by clicking a button that triggers checks to ensure the order data is complete.
- Possible to remove or add a product to an order.
- You can navigate back to the orders overview after having updated an order, the changes will be taken into account.

## Assumptions:
- When displaying an item from an order, I calculate the value of the line instead of reading the total. Since I have to use this logic when adding an new item to an order (no total provided), I thought it would make more sense to apply same logic on both sides.

## How to use it:
- Run the command `git clone https://github.com/GeniaT/ordering.git`,
- run `npm install`.
- Once done, run the command `npm run dev-server` to see the app running locally on your computer.
- Wanna test the actions and the reducer? Run `npm run test` to run the Jest suite. 
