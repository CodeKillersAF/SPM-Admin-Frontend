
import {BrowserRouter, BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/home/Home';

import AdminLoginPage from './pages/AdminLoginPage/Adminloginpage';

import AddCategoryPage from './pages/FoodManagePages/Category/Addcategorypage';
import AddFoodPage from './pages/FoodManagePages/Food/Addfoodpage';
import ViewCategoryPage from './pages/FoodManagePages/Category/Viewcategorypage';
import ViewFoodPage from './pages/FoodManagePages/Food/Viewfoodpage';
import ViewTable from './pages/viewTable/ViewTable';
import ViewTableCategory from './pages/viewTableCategory/ViewTableCategory';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <section>
          <Switch>

            <Route exact path="/" component={AdminLoginPage} />

            <Layout>
              <Route path="/home" component={Home} />
              <Route path="/didula/add-category" component={AddCategoryPage} />
              <Route path="/didula/add-food" component={AddFoodPage} />
              <Route path="/didula/view-category" component={ViewCategoryPage} />
              <Route path="/didula/view-food" component={ViewFoodPage} />
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
