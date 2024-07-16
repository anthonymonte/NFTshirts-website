import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import useContract from "../logic/accounts-hook";

export function NFTViewPage() {
  const { id } = useParams();
  const { contract } = useContract();
  const [owner, setOwner] = useState();

  useEffect(() => {
    if (contract) {
      ownerOf(id);
    }
  }, [contract, id])

  const ownerOf = async (id) => {
    try {
      const owner = await contract.methods.ownerOf(id).call()
      setOwner(owner);
    } catch {
      setOwner('Nonexistant token')
    }
  };

  return <NFTView ownerAddress={owner} nftId={id} />
}


export function NFTView(props) {

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: 'calc(100vh - 62px)',
      backgroundColor: '#f0f0f0',
      padding: '20px',
      boxSizing: 'border-box'
    },
    image: {
      width: '100%',
      maxWidth: '300px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    },
    infoContainer: {
      marginTop: '20px',
      textAlign: 'center',
      color: '#333'
    },
    id: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '5px'
    },
    address: {
      fontSize: '10px',
      fontWeight: 'normal',
      color: '#555'
    }
  };

  return (
    <div style={styles.container}>
      <img src={`https://alteredbeasts.s3.us-east-2.amazonaws.com/nft_${props.nftId}.png`} alt="NFT" style={styles.image} />
      <div style={styles.infoContainer}>
        <div style={styles.id}>NFT ID: {props.nftId}</div>
        <div style={styles.address}>Owner: {props.ownerAddress || 'Loading...'}</div>
      </div>
    </div>
  );
}
