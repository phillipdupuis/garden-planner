import React from 'react';
import Header from './components/Header';
import Designer from './pages/Designer';
import About from './pages/About';
import Shrine from './pages/Shrine';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPageId: 'designer',
    };
    const page = (id, label) => ({id: id, label: label});
    this.pages = [
      page('designer', 'Garden Planner'),
      page('about', 'About'),
      page('shrine', 'The Shrine'),
    ];
    this.handleSelectPage = this.handleSelectPage.bind(this);
  }

  handleSelectPage(pageId) {
    this.setState((state) => {
      return {
        currentPageId: pageId
      }
    });
  }

  renderBody() {
    if (this.state.currentPageId === 'designer') {
      return <Designer />;
    } else if (this.state.currentPageId === 'about') {
      return <About />;
    } else if (this.state.currentPageId === 'shrine') {
      return <Shrine />;
    } else {
      return <p>No clue</p>;
    }
  }

  render() {
    return (
      <div className="App">
        <Header
          pages={this.pages}
          currentPageId={this.state.currentPageId}
          handleSelectPage={this.handleSelectPage}
        />
        {this.renderBody()}
      </div>
    );
  }
}

export default App;
