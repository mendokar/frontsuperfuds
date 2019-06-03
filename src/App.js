import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import AddStock from './components/add_stock';
import New_product from './components/new_product';
import View_stock from './components/view_stock';
import Buy_products from './components/buy_products';
import View_informes from './components/view_informes';

import './App.css';


function App() {
  return (
    <Router>
      <div className="App">
        <div>

          <nav className="navbar navbar-expand-lg">
            <img src="https://superfuds.com/images/page/logosuperf.svg" className="App-logo" alt="logo" />
            <h4 className="title">Bienvenido a SuperFuds</h4>

            <ul className="navbar-nav mr-auto">
              <li><button className="btn btn-outline-dark"><Link to={'/new_product'} className="nav-link"> Nuevo Producto </Link></button></li>
              <li><button className="btn btn-outline-dark"><Link to={'/add_stock'} className="nav-link"> Proveedor Entrega Pedidos </Link></button></li>
              <li><button className="btn btn-outline-dark"><Link to={'/view_stock'} className="nav-link"> Ver Stock </Link></button></li>
              <li><button className="btn btn-outline-dark"><Link to={'/buy_products'} className="nav-link"> Compra </Link></button></li>
              <li><button className="btn btn-outline-dark"><Link to={'/view_informes'} className="nav-link"> Informes </Link></button></li>
            </ul>
          </nav>
          <hr />
          <Switch>
            <Route exact path='/new_product' component={New_product} />
            <Route exact path='/add_stock' component={AddStock} />
            <Route exact path='/view_stock' component={View_stock} />
            <Route exact path='/buy_products' component={Buy_products} />
            <Route exact path='/view_informes' component={View_informes} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
