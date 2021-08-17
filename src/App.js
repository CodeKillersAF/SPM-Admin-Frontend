
import { BrowserRouter, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/home/Home';
import ViewSupplier from './pages/supplier/ViewSupplier';
import AddSupplyItem from './pages/supplyItem/AddSupplyItem';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <section>
          <Switch>
            <Layout>
              <Route exact path="/" component={Home} />
              <Route path="/supplier" component={ViewSupplier} />
              <Route path="/addsupplyItem" component={AddSupplyItem} />
            </Layout>
          </Switch>
        </section>
      </BrowserRouter>
    </div>
  );
}

export default App;
