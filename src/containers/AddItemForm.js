import React from 'react';
import { productIdExists, getUnitPrice } from '../selectors/selectors';

class AddItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: '',
      quantity: '',
      error: ''
    }
  }

  onChangeProductId = (e) => {
    const productId = e.target.value;
    this.setState(() => ({productId}));
  }

  onChangeQuantity = (e) => {
    const quantity = e.target.value;
    this.setState(() => ({quantity}));
  }

  resetState = () => {
    this.setState(() => ({productId: '', quantity: 0, error: ''}));
  }

  render() {
    return (
      <div>
        <form>
          <label>Product Id</label>
          <input type="text" id="productId" required value={this.state.productId} onChange={this.onChangeProductId}/>
          <label>Quantity</label>
          <input type="text" id="quantity" required value={this.state.quantity} onChange={this.onChangeQuantity}/>
          <button type="button"
            onClick={() => {
              if (productIdExists(this.state.productId) && Number.isInteger(parseInt(this.state.quantity)) && Number(this.state.quantity) > 0) {
                this.props.addItem({"product-id": this.state.productId, "quantity": this.state.quantity, "unit-price": getUnitPrice(this.state.productId)});
                this.resetState();
              } else {
                this.setState({error: 'Please make sure the product ID exists and quantity is a number greater than 0'})
              }
            }}>Add
          </button>
          {this.state.error !== '' && <p>{this.state.error}</p>}
        </form>
      </div>
    )
  }
}



export default AddItemForm;
