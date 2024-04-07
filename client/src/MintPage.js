import './MintPage.css'; 
import React, { useEffect, useState } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';
import abi from './nftshirts-abi.json';
import tshirtImage from './tshirt1.png'; // Adjust the path as necessary

const contractAddress = '0x5295c1523aee5F6b12246501aba6424895b9D375';

function MintPage() {
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [design, setDesign] = useState('');
  const [transactionStatus, setTransactionStatus] = useState('');
  const [isMinted, setIsMinted] = useState(false);
  
  useEffect(() => {
    const init = async () => {
      const provider = await detectEthereumProvider();
      if (provider) {
        const web3 = new Web3(provider);
        const accounts = await provider.request({ method: 'eth_requestAccounts' });
        setAccounts(accounts);
        const contract = new web3.eth.Contract(abi, contractAddress);
        setContract(contract);
      } else {
        console.error('Please install MetaMask.');
      }
    };
    init();
  }, []);

  const handleMint = async () => {
    console.log(`Minting design: ${design}`);
    const price = Web3.utils.toWei('0.001', 'ether'); // Set the price in Wei
    contract.methods.createCollectible().send({ from: accounts[0], value: price })
    .on('transactionHash', (hash) => { 
      console.log(`Transaction hash: ${hash}`);
      setTransactionStatus('Transaction in progress...')
    })
    .on('confirmation', (confirmationNumber, receipt) => { 
      console.log(`Transaction confirmed. Confirmation number: ${confirmationNumber}. Receipt:`);
      console.log(receipt); 
      setTransactionStatus('Transaction confirmed!');
      setIsMinted(true);
    })
    .on('error', console.error)
    .catch((err) => {
      console.error(err);
      setTransactionStatus('An error occurred. Please try again.');
    });
  };

  const handleDesignChange = (event) => {
    setDesign(event.target.value);
  };

  return (
    <div className="mint-container">
      <h2 className="main-heading">Mint Your NFT</h2>
      <div className="mint-item-container">
        <button className="mint-button" onClick={handleMint}>Mint NFT</button>
      </div>
      {isMinted && (
        <div className="minted-tshirt-container">
          <h3>Your Unique NFT-Shirt!</h3>
          <img src={tshirtImage} alt="Minted T-Shirt" className="minted-tshirt-image" />
        </div>
      )}
      <p className="sub-heading">{transactionStatus}</p>
    </div>
  );
}

export default MintPage;
