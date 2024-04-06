import React from 'react';
import { Link } from 'react-router-dom';

function NavigationBar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/mint">Mint NFT</Link></li>
        <li><Link to="/order">Order T-Shirt</Link></li>
      </ul>
    </nav>
  );
}

export default NavigationBar;
