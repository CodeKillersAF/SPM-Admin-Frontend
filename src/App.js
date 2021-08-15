
import {BrowserRouter, BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/home/Home';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <section>
          <Switch>
            <Layout>
              <Route exact path="/" component={Home} />
            </Layout>
          </Switch>
        </section>
      </BrowserRouter>
    </div>
  );
}

export default App;
