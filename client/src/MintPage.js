import React, { useState } from 'react';

function MintPage() {
  const [design, setDesign] = useState('');

  const handleDesignChange = (event) => {
    setDesign(event.target.value);
  };

  const handleMint = () => {
    // Code to interact with smart contract to mint NFT
    console.log(`Minting design: ${design}`);
  };

  return (
    <div>
      <h2>Mint Your NFT</h2>
      <select value={design} onChange={handleDesignChange}>
        {/* Options should be populated based on available designs */}
        <option value="design1">Design 1</option>
        <option value="design2">Design 2</option>
        {/* ... other designs */}
      </select>
      <button onClick={handleMint}>Mint NFT</button>
    </div>
  );
}

export default MintPage;
