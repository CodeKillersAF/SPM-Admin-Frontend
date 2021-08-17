
import {BrowserRouter, BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/home/Home';

import AdminLoginPage from './pages/AdminLoginPage/Adminloginpage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <section>
          <Switch>

          <Route exact path="/" component={AdminLoginPage} />

            <Layout>
              <Route exact path="/home" component={Home} />
            </Layout>
          </Switch>
        </section>
      </BrowserRouter>
    </div>
  );
}

export default App;
