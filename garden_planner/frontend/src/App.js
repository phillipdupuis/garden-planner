import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import LogInModal from './components/LogInModal';
import SignUpModal from './components/SignUpModal';
import Designer from './pages/Designer';
import About from './pages/About';
import Shrine from './pages/Shrine';
import Credits from './pages/Credits';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function PageNotFound() {
  return <p>Page not found.</p>;
}

function convertFormDataToObject(formData) {
  const obj = {};
  for (const [key, value] of formData.entries()) {
    obj[key] = value;
  }
  return obj;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      overlay: null,
      loggedIn: localStorage.getItem('token') ? true : false,
      username: null,
      logInError: null,
      signUpError: null,
    };
    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  componentDidMount() {
    if (this.state.loggedIn) {
      fetch('/backend/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(response => response.json())
        .then(json => {
          this.setState({ username: json.username });
        });
    }
  }

  renderOverlay() {
    if (this.state.overlay === 'LogInModal') {
      return (
        <LogInModal
          handleClose={() => { this.setState({ overlay: null, logInError: null, signUpError: null }) } }
          handleLogIn={this.handleLogIn}
          handleSwitchToSignUp={() => { this.setState({ overlay: 'SignUpModal', logInError: null }) } }
          errorText={this.state.logInError}
        />
      );
    } else if (this.state.overlay === 'SignUpModal') {
      return (
        <SignUpModal
          handleClose={() => { this.setState({ overlay: null, logInError: null, signUpError: null }) } }
          handleSignUp={this.handleSignUp}
          errorText={this.state.signUpError}
        />
      );
    } else {
      return null;
    }
  }

  async handleLogIn(event) {
    event.preventDefault();
    try {
      const formData = new FormData(event.target);
      const userData = convertFormDataToObject(formData);
      const response = await fetch('/token-auth/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error(response.status);
      } else {
        const json = await response.json();
        localStorage.setItem('token', json.token);
        this.setState({
          overlay: null,
          loggedIn: true,
          username: json.user.username,
          logInError: null,
          signUpError: null,
        });
      }
    } catch (error) {
      this.setState({
        logInError: String(error),
      });
    }
  }

  async handleSignUp(event) {
    event.preventDefault();
    try {
      const formData = new FormData(event.target);
      const userData = convertFormDataToObject(formData);
      const response = await fetch('/backend/users/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error(response.status);
      } else {
        const json = await response.json();
        localStorage.setItem('token', json.token);
        this.setState({
          overlay: null,
          loggedIn: true,
          username: json.username,
          logInError: null,
          signUpError: null,
        });
      }
    } catch (error) {
      console.log(error);
      this.setState({
        signUpError: error,
      });
    }
  }

  navButtons() {
    if (this.state.loggedIn) {
      return ([
        {
          name: 'Log out',
          handleClick: () => {
            localStorage.removeItem('token');
            this.setState({ loggedIn: false, username: null });
          }
        }
      ]);
    } else {
      return ([
        {
          name: 'Log in',
          handleClick: () => {
            this.setState({ overlay: 'LogInModal' });
          }
        }
      ]);
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Header
            defaultPath={'/'}
            navItems={[
              {
                path: '/',
                name: 'Designer'
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
            navButtons={this.navButtons()}
          />
          {this.renderOverlay()}
          {(this.state.loggedIn) ? <p>{`Logged in as ${this.state.username}`}</p> : <p>Not logged in</p>}
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