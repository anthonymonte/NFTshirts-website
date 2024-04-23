import React, { useState } from 'react';
import './MintPage.css';
import Web3 from 'web3';
import tshirtImage from './tshirt1.png'; 
import useContract from './contract-hook';


function MintPage() {
  const [transactionStatus, setTransactionStatus] = useState('');
  const [isMinting, setIsMinting] = useState(false);
  const [isMinted, setIsMinted] = useState(false);  // Define isMinted here
  const {contract, accounts} = useContract();

  const handleMint = async () => {
    setIsMinting(true);
    const price = Web3.utils.toWei('0.001', 'ether'); 
    contract.methods.createCollectible().send({ from: accounts[0], value: price })
    .on('transactionHash', (hash) => {
      setTransactionStatus('Transaction in progress...')
    })
    .on('confirmation', (confirmationNumber, receipt) => {
      setIsMinting(false);
      setIsMinted(true);  // Update isMinted state here
      setTransactionStatus('Transaction confirmed!');
    })
    .on('error', (error) => {
      setIsMinting(false);
      setIsMinted(false);  // Update isMinted state here
      setTransactionStatus('An error occurred. Please try again.');
      console.error(error);
    });
  };

  return (
    <div className="mint-container">
      <h2 className="main-heading">Mint Your NFT</h2>
      <div className="mint-item-container">
        <button className="mint-button" onClick={handleMint} disabled={isMinting}>
          {isMinting ? 'Minting...' : 'Mint NFT'}
        </button>        
      </div>
      {isMinting && <div className="loader"></div>}
      {transactionStatus && <p className="sub-heading">{transactionStatus}</p>}
      {isMinted && (
        <div className="minted-tshirt-container">
          <h3>Your Unique NFT-Shirt!</h3>
          <img src={tshirtImage} alt="Minted T-Shirt" className="minted-tshirt-image" />
        </div>
      )}
    </div>
  );
}

export default MintPage;
