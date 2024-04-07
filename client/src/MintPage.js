import './MintPage.css'; 
import React, { useEffect, useState } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';
import abi from './nftshirts-abi.json';

const contractAddress = '0x28b12a2bDa3e15bd947229f54Cd9EaF90A7A4F21';


function MintPage() {
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [design, setDesign] = useState('');
  const [transactionStatus, setTransactionStatus] = useState('');
  
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
    <div>
      <h2>Mint Your NFT</h2>
      <select value={design} onChange={handleDesignChange}>
        {/* Options should be populated based on available designs */}
        <option value="design1">Design 1</option>
        <option value="design2">Design 2</option>
        {/* ... other designs */}
      </select>
      <button onClick={handleMint}>Mint NFT</button>
      <p>{transactionStatus}</p>
    </div>
  );
}

export default MintPage;
