import React from 'react';
import { connect } from 'react-redux';
import { updateOrder } from '../reducers/index';
import AddItemForm from './AddItemForm';
import { getItemDescriptionFromId } from '../selectors/selectors';

class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: "0"
    }
  }

  addItem(item) {
    const amountToAdd = Number(item.quantity) * Number(item["unit-price"]);
    let alreadyOrdered = false;
    if (this.state.items.length > 0) {
      this.state.items.forEach((x) => {
        if (x["product-id"] === item["product-id"]) {
          console.log("Product id already ordered");
          alreadyOrdered = true;
        }
      });
      if (!alreadyOrdered) {
        new Promise((resolve, reject) => {
          resolve(this.setState((prevState) => ({
            items:[...this.state.items, item],
            total: parseFloat(Number(prevState.total) + amountToAdd).toFixed(2)
          })))
        }).then(() => {
          this.props.updateOrder(this.state.id, this.state);
        })
      }
    } else {
      new Promise((resolve, reject) => {
        resolve(this.setState(() => ({
          items:[...this.state.items, item],
          total: parseFloat(amountToAdd).toFixed(2)
        })))
      }).then(() => {
        this.props.updateOrder(this.state.id, this.state);
      });
    }
  }

  removeItem(id) {
    let amountToRemove;
    if (this.state.items.length === 1) {
      return new Promise((resolve, reject) => {
        resolve(this.setState({
          total: "0",
          items: []
        }))
      }).then(() => this.props.updateOrder(this.state.id, this.state))
    }

    this.state.items.forEach((item) => {
      if (item["product-id"] === id) {
        amountToRemove = Number(item.quantity) * Number(item["unit-price"]);
      }
    })

    new Promise((resolve, reject) => {
      resolve(this.setState((prevState) => ({
        items: this.state.items.filter((item) => item["product-id"] !== id),
        total: parseFloat(Number(prevState.total) - amountToRemove).toFixed(2)
      })))
    }).then(() => {
      this.props.updateOrder(this.state.id, this.state);
    });
  }

  componentDidMount() {
    const orderForState = this.props.orders.filter((order) => order.id === this.props.location.state.order.id);
    this.setState({
      id: this.props.location.state.order.id,
      'customer-id': this.props.location.state.order['customer-id'],
      items: orderForState[0].items,
      total: orderForState[0].total
    });
  }


  render() {
    return (
      <div>
        <h1>Order overview</h1>
        {this.state.items && this.state.items.length > 0 && <div>
          <table>
            <thead>
              <tr>
                <th>{'Item Id'}</th>
                <th>{'Description'}</th>
                <th>{'Unit price'}</th>
                <th>{'Quantity'}</th>
                <th>{'Total'}</th>
              </tr>
            </thead>
            <tbody>
            {this.state.items && this.state.items.map((item, index) =>
              <tr key={index}>
                <td>{item["product-id"]}</td>
                <td>{getItemDescriptionFromId(item["product-id"])}</td>
                <td>{item["unit-price"]}</td>
                <td>{item.quantity}</td>
                <td>{(item.quantity * item["unit-price"]).toFixed(2)}</td>
                <td><button onClick={() => this.removeItem(item["product-id"])}>{'X'}</button></td>
              </tr>
            )}
            </tbody>
          </table>
          </div>
        }
        <h2>{'Total value this order: '}{this.state.total}</h2>
        <AddItemForm addItem={item => this.addItem(item)}/>
      </div>
    )
  }

}

const mapStateToProps = (state) => ({
  orders: state.orders
})
const mapDispatchToProps = (dispatch) => ({
  updateOrder: (id, order) => dispatch(updateOrder(id, order)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Order);
