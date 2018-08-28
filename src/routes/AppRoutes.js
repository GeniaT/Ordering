import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Orders from '../containers/Orders';
import Order from '../containers/Order';
import AddItemForm from '../containers/AddItemForm';
import WrongPage from '../components/WrongPage';


const AppRoutes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={Orders} exact={true}/>
      <Route path="/order/:id" component={Order}/>
      <Route path="/addItemForm" component={AddItemForm}/>
      <Route component={WrongPage}/>
    </Switch>
  </BrowserRouter>
)


export default AppRoutes;
