import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import orders from '../data/orders.json';
import { initOrders } from '../ducks/orders/actions';
import { getCustomerNameFromId } from '../selectors/selectors';

class Orders extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    return this.props.orders.length === 0 ? this.props.initOrders(orders) : null
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
        {this.props.orders && this.props.orders.map((order, index) =>
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

const mapStateToProps = (state) => ({
  orders: state.orders,
})

const mapDispatchToProps = (dispatch) => ({
  initOrders: (orders) => dispatch(initOrders(orders)),
})
export default connect(mapStateToProps, mapDispatchToProps)(Orders);
