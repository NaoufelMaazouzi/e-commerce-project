import ProductsComponent from './Components/products';
import ProductDetails from './Components/productDetails';
import SearchBar from './Components/searchBar';
import SignUp from './Components/signUp';
import PublicRoute from './ReactRouterRoutes/publicRoute';
import Dashboard from './Components/dashboard';


import {
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";

function App() {

  return (
    <Router>
      <div className="App">
        <SearchBar />
        <Switch>
          <PublicRoute exact path="/" component={ProductsComponent} />
          <PublicRoute path="/product/:id" component={ProductDetails} />
          <PublicRoute path="/signUp" component={SignUp} />
          <PublicRoute path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    </Router >
  );
}

export default App;
