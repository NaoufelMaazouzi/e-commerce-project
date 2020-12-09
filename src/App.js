import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './Components/searchBar';
import ProductsComponent from './Components/products';
import ProductDetails from './Components/productDetails';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/products/')
      .then(response => {
        setProducts(response.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  return (
    <Router>
      <div className="App">
        <SearchBar />
        <Switch>
          <Route exact path="/" component={ProductsComponent}>
          </Route>
          <Route path="/:id" component={ProductDetails}>
          </Route>
        </Switch>
      </div>
    </Router >
  );
}

export default App;
