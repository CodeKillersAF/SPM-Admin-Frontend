
import {BrowserRouter, BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/home/Home';

import AdminLoginPage from './pages/AdminLoginPage/Adminloginpage';

import ViewCategoryPage from './pages/FoodManagePages/Category/Viewcategorypage';
import ViewFoodPage from './pages/FoodManagePages/Food/Viewfoodpage';
import Rate from './pages/FoodManagePages/Rate/Rate';
import ViewTable from './pages/viewTable/ViewTable';
import ViewTableCategory from './pages/viewTableCategory/ViewTableCategory';

import Report from './pages/FoodManagePages/Report/Report';

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
              <Route path="/table" component={ViewTable}/>
              <Route path="/tableCategory" component={ViewTableCategory}/>

              <Route path="/report" component={Report} />
            </Layout>
          </Switch>
        </section>
      </BrowserRouter>
    </div>
  );
}

export default App;
