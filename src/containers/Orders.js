import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import orders from '../data/orders.json';
import { initOrders } from '../ducks/orders/actions';
import { getCustomerNameFromId, customerIdExists } from '../selectors/selectors';

class Orders extends React.Component {
  constructor(props) {
    super(props);
  }

  processOrder(order) {
    if (order.items.length > 0 && order.total > 0) {
      console.log("Thank you for your order, everything looks great!")
    } else if (order.total == 0 || !customerIdExists(order["customer-id"])){
      console.log("order failed, the total should be greater than 0 and the customer ID should exist in the API");
    }
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
              <button onClick={() => this.processOrder(order)}>{'Place the order'}</button>
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

Orders.propTypes = {
  initOrders: PropTypes.func.isRequired,
  orders: PropTypes.arrayOf(PropTypes.object),
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
