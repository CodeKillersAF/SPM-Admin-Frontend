
import { BrowserRouter, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/home/Home';
import ViewSupplier from './pages/supplier/ViewSupplier';
import AddSupplyItem from './pages/supplyItem/AddSupplyItem';

import AdminLoginPage from './pages/AdminLoginPage/Adminloginpage';
import AddSupplier from './pages/supplier/AddSupplier';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <section>
          <Switch>

            <Route exact path="/" component={AdminLoginPage} />

            <Layout>
              <Route path="/home" component={Home} />
              <Route path="/supplier" component={ViewSupplier} />
              <Route path="/addsupplyItem" component={AddSupplyItem} />
              <Route path="/addsupplier" component={AddSupplier} />
            </Layout>
          </Switch>
        </section>
      </BrowserRouter>
    </div>
  );
}

export default App;
