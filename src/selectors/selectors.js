import customers from '../data/customers.json';
import products from '../data/products.json';

export function getCustomerNameFromId(id) {
  const customerArray = customers.filter((customer) => customer.id === id);
  if (customerArray.length > 0) {
    return customerArray[0].name;
  }
}

export function getItemDescriptionFromId(id) {
  const productsArray = products.filter((item) => item.id === id);
  if (productsArray.length > 0) {
    return productsArray[0].description;
  }
}

export function productIdExists(id) {
  if (products.filter((item) => item.id === id).length > 0) {
    return true;
  }
  return false;
}

export function getUnitPrice(id) {
  const unitPrice = products.filter((item) => item.id === id)[0].price;
  return unitPrice;
}

export function customerIdExists(id) {
  if (customers.filter((customer) => customer.id === id).length > 0) {
    return true;
  }
  return false;
}
