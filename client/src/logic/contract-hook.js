import { useEffect, useState } from 'react';
import Web3 from 'web3';
import abi from '../nftshirts-abi.json';

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

const sepoliaDetails = {
  chainId: '0xaa36a7', // Hexadecimal chain ID for Polygon Mainnet
  chainName: 'Sepolia test network',
  rpcUrls: ['https://sepolia.infura.io/v3/'],
  blockExplorerUrls: ['https://sepolia.etherscan.io']
}

const contractAddress = '0x665f04bBEbC70B688e2963F2D935acD4e7481CEF';

const useContract = () => {
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadContract = async () => {
      try {
        // Request account access if needed
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccounts(accounts);

        // Switch to Polygon network
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: sepoliaDetails.chainId }],
        }).catch(async (switchError) => {
          // This error code indicates that the chain has not been added to MetaMask
          if (switchError.code === 4902) {
            try {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [sepoliaDetails]
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
        setError(err);
      }
    };

    loadContract();
  }, []);

  return { contract, accounts };
};

export default useContract;
