import React from 'react';
import { Link } from "react-router-dom";
import orders from '../data/orders.json';
import { getCustomerNameFromId } from '../selectors/selectors';

class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  updateOrder(order) {
    this.setState({
      order
    })
  }

  componentDidMount() {
    this.setState({orders});
  }

  render() {
    return (
      <div>
        <table>
        <thead>
          <tr>
            <th>{'Order Id'}</th>
            <th>{'Customer Name'}</th>
            <th>{'Total Value'}</th>
          </tr>
        </thead>
        <tbody>
        {this.state.orders && this.state.orders.map((order, index) =>
          <tr key={index}>
            <td>{order.id}</td>
            <td>{getCustomerNameFromId(order["customer-id"])}</td>
            <td>{order.total}</td>
            <td>
              <Link to={{
                pathname: `/order/${order.id}`,
                state: {order}
            }}>
                <button>{'...'}</button>
              </Link>
              <button>{'Place the order'}</button>
            </td>
          </tr>
        )}
        </tbody>
        </table>
      </div>
    )
  }

}

export default Orders;
