import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Designer from './pages/Designer';
import About from './pages/About';
import Shrine from './pages/Shrine';
import Credits from './pages/Credits';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function PageNotFound() {
  return <p>Page not found.</p>;
}

class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Header
            defaultPath={'/'}
            navItems={[
              {
                path: '/',
                name: 'Garden Designer'
              },
              {
                path: '/about',
                name: 'About'
              },
              {
                path: '/shrine',
                name: 'Shrine'
              },
              {
                path: '/credits',
                name: 'Credits'
              }
            ]}
          />
          <Switch>
            <Route exact path="/" component={Designer} />
            <Route path="/about" component={About} />
            <Route path="/shrine" component={Shrine} />
            <Route path="/credits" component={Credits} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;