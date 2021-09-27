
import { BrowserRouter, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/home/Home';
import ViewSupplier from './pages/supplier/ViewSupplier';
import AddSupplyItem from './pages/supplyItem/AddSupplyItem';
import AdminLoginPage from './pages/AdminLoginPage/Adminloginpage';
import ViewCategoryPage from './pages/FoodManagePages/Category/Viewcategorypage';
import ViewFoodPage from './pages/FoodManagePages/Food/Viewfoodpage';
import Rate from './pages/FoodManagePages/Rate/Rate';
import AddSupplier from './pages/supplier/AddSupplier';
import ViewTable from './pages/viewTable/ViewTable';
import ViewTableCategory from './pages/viewTableCategory/ViewTableCategory';
import Orders from './pages/orders/Orders';
import ViewSupplyItem from './pages/supplyItem/ViewSupplyItem';
import ViewItems from './pages/supplier/ViewItems';
import Test from './pages/test/Test';
import Promotion from './pages/Promotion/Promotion';
import SupplyRecord from './pages/supplyRecord/SupplyRecord';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <section>
          <Switch>

            <Route exact path="/" component={AdminLoginPage} />

            <Layout>
              <Route path="/home" component={Home} />
              <Route path="/foodCategory/view-category" component={ViewCategoryPage} />
              <Route path="/foodCategory/view-food/:id" component={ViewFoodPage} />
              <Route path="/rate" component={Rate} />
              <Route path="/supplier" component={ViewSupplier} />
              <Route path="/supplyItem" component={ViewSupplyItem} />
              <Route path="/addsupplyItem" component={AddSupplyItem} />
              <Route path="/addsupplier" component={AddSupplier} />
              <Route path="/singlesupplyItem/:id" component={ViewItems}></Route>
              <Route path="/table" component={ViewTable}/>
              <Route path="/tableCategory" component={ViewTableCategory}/>
              <Route path="/online-orders" component={Orders} />
              <Route path="/test" component={Test} />
              <Route path="/promotion" component={Promotion}/>
              <Route path="/supplyRecord" component={SupplyRecord}/>

            </Layout>
          </Switch>
        </section>
      </BrowserRouter>
    </div>
  );
}

export default App;
