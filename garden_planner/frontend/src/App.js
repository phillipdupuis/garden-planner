import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Designer from './pages/Designer';
import About from './pages/About';
import Shrine from './pages/Shrine';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function PageNotFound() {
  return <p>Page not found.</p>;
}

function App() {
  const navItem = (path, name) => ({ path: path, name: name });
  return (
    <BrowserRouter>
      <div className="app">
        <Header
          defaultPath={'/'}
          navItems={[
            navItem('/', 'Garden Designer'),
            navItem('/about', 'About'),
            navItem('/shrine', 'Shrine')
            ]}
        />
        <Switch>
          <Route exact path="/" component={Designer} />
          <Route path="/about" component={About} />
          <Route path="/shrine" component={Shrine} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;