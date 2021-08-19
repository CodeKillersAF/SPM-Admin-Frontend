
import {BrowserRouter, BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/home/Home';

import AdminLoginPage from './pages/AdminLoginPage/Adminloginpage';
import AddNewTable from './pages/addNewTable/AddNewTable';
import AddNewTableCategory from './pages/addNewTableCategory/AddNewTableCategory';
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
              <Route exact path="/home" component={Home} />
              <Route path="/addNewTable" component={AddNewTable} />
              <Route path="/addNewTableCategory" component={AddNewTableCategory}/>
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
