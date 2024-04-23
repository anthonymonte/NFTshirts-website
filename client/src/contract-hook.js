import { useEffect, useState } from 'react';
import Web3 from 'web3';
import abi from './nftshirts-abi.json';

// Polygon Mainnet details
const polygonDetails = {
  chainId: '0x89', // Hexadecimal chain ID for Polygon Mainnet
  chainName: 'Polygon Mainnet',
  rpcUrls: ['https://polygon-rpc.com/'],
  blockExplorerUrls: ['https://polygonscan.com/']
};

const amoyDetails = {
  chainId: '0x13882', // Hexadecimal chain ID for Polygon Mainnet
  chainName: 'POLYGON AMOY TESTNET',
  rpcUrls: ['https://rpc-amoy.polygon.technology/'],
  blockExplorerUrls: ['https://www.oklink.com/amoy']
};

const contractAddress = '0x4436Dbb8152614D2FCEe6b68c0aA385e4Cd5e015';

const useContract = () => {
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const loadContract = async () => {
      try {
        // Request account access if needed
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccounts(accounts);

        // Switch to Polygon network
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: amoyDetails.chainId }],
        }).catch(async (switchError) => {
          // This error code indicates that the chain has not been added to MetaMask
          if (switchError.code === 4902) {
            try {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [amoyDetails]
              });
            } catch (addError) {
              console.error('Failed to add the Polygon network:', addError);
            }
          }
        });

        // Connect to the network and load the contract
        const web3 = new Web3(window.ethereum);
        const loadedContract = new web3.eth.Contract(abi, contractAddress);
        setContract(loadedContract);
      } catch (err) {
        console.error('Failed to load contract:', err);
      }
    };

    loadContract();
  }, []);

  return { contract, accounts };
};

export default useContract;
