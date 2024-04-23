import React, { useEffect, useState } from 'react';
import './MintPage.css';
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';
import abi from './nftshirts-abi.json';
import tshirtImage from './tshirt1.png'; 

const contractAddress = '0x5295c1523aee5F6b12246501aba6424895b9D375';

function MintPage() {
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [transactionStatus, setTransactionStatus] = useState('');
  const [isMinting, setIsMinting] = useState(false);
  const [isMinted, setIsMinted] = useState(false);  // Define isMinted here

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
