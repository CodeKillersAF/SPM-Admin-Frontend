
import {BrowserRouter, BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/home/Home';

import AdminLoginPage from './pages/AdminLoginPage/Adminloginpage';
import ViewTable from './pages/viewTable/ViewTable';
import ViewTableCategory from './pages/viewTableCategory/ViewTableCategory';
import Orders from './pages/orders/Orders';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <section>
          <Switch>

          <Route exact path="/" component={AdminLoginPage} />

            <Layout>
              <Route exact path="/home" component={Home} />
              <Route path="/table" component={ViewTable}/>
              <Route path="/tableCategory" component={ViewTableCategory}/>
              <Route path="/online-orders" component={Orders} />
            </Layout>
          </Switch>
        </section>
      </BrowserRouter>
    </div>
  );
}

export default App;
