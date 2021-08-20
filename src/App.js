
import { BrowserRouter, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/home/Home';
import ViewSupplier from './pages/supplier/ViewSupplier';
import AddSupplyItem from './pages/supplyItem/AddSupplyItem';

import AdminLoginPage from './pages/AdminLoginPage/Adminloginpage';
import AddSupplier from './pages/supplier/AddSupplier';
import ViewTable from './pages/viewTable/ViewTable';
import ViewTableCategory from './pages/viewTableCategory/ViewTableCategory';
import ViewSupplyItem from './pages/supplyItem/ViewSupplyItem';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <section>
          <Switch>

            <Route exact path="/" component={AdminLoginPage} />

            <Layout>
              <Route exact path="/home" component={Home} />
              <Route path="/supplier" component={ViewSupplier} />
              <Route path="/supplyItem" component={ViewSupplyItem} />
              <Route path="/addsupplyItem" component={AddSupplyItem} />
              <Route path="/addsupplier" component={AddSupplier} />
              <Route path="/table" component={ViewTable}/>
              <Route path="/tableCategory" component={ViewTableCategory}/>
            </Layout>
          </Switch>
        </section>
      </BrowserRouter>
    </div>
  );
}

export default App;
