import React, { Component } from 'react';
import {
  Routes,
  Route,
} from 'react-router-dom';
import Main from './components/main/Main';
import Header from './components/header/Header';
import Description from './components/description/Description';
import Bag from './components/bag/Bag';

export class App extends Component {
  state = { overlay: false }

  render() {
    const handleSmallCart = () => {
      this.setState({ overlay: !this.state.overlay });
      if (!this.state.overlay) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    };

    return (
      <div>
        <nav>
          {' '}
          <Header stateCart={this.state} change={handleSmallCart} />
        </nav>
        <Routes>
          <Route path="/" element={<Main stateCart={this.state} page={0} />} />
          <Route path="/clothes" element={<Main stateCart={this.state} page={1} />} />
          <Route path="/tech" element={<Main stateCart={this.state} page={2} />} />
          <Route path="/description" element={<Description />} />
          <Route path="/bag" element={<Bag />} />
        </Routes>
      </div>
    );
  }
}

export default App;
