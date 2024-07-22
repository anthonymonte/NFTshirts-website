import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css';

function NavigationBar() {
  return (
    <>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/mint">Mint NFT</Link></li>
          <li><Link to="/order">Order T-Shirt</Link></li>
        </ul>
      </nav>
      <div className='spacer' />
    </>
  );
}

export default NavigationBar;
