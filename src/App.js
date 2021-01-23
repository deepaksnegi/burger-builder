import { Route, Switch } from "react-router-dom";
import Layout from "./component/layout/Layout";
import Authentication from "./containers/Authentication/Authentication";
import BurgerBuilder from "./containers/burgerBuilder/BurgerBuilder";
import Checkout from "./containers/burgerBuilder/checkout/Checkout.jsx";
import Orders from "./containers/burgerBuilder/Orders/Orders/Orders";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/login" component={Authentication} />
        <Route path="/Orders" component={Orders} />
      </Switch>
    </Layout>
  );
}

export default App;
