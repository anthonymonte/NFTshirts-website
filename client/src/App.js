import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import MintPage from './MintPage';
import OrderPage from './OrderPage';
import NavigationBar from './NavigationBar';
import { NFTViewPage } from './NFTViewPage';

function App() {
  return (
    <Router>
      <NavigationBar />
      {/* Comment out Routes to test NavigationBar alone */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mint" element={<MintPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/:id" element={<NFTViewPage />} />
      </Routes>
    </Router>
  );
}


export default App;
