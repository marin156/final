import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

import Router from './Router';

const Navigation = (props) => <nav>
  <ul className='meni'>
    <li className='menili'><NavLink to='/'>Pocetna</NavLink></li>
    <li className='menili'><NavLink to='/cart'>Kosarica</NavLink></li>
  </ul>
</nav>

class App extends Component {
  render() {
    return <div className='page-container'>
      <Navigation></Navigation>

      <Router></Router>
    </div>
  }
}

export default App;
