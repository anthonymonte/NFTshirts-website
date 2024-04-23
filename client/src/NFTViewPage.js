import React from "react";
import { useParams } from 'react-router-dom';
import NFTGrid from "./NFTGrid";

export function NFTViewPage() {
  const { id } = useParams();
  // return <NFTView ownerAddress='abcd' nftId={id} />
  return <NFTGrid />
}


export function NFTView(props) {

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
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
      fontSize: '16px',
      fontWeight: 'normal',
      color: '#555'
    }
  };

  return (
    <div style={styles.container}>
      <img src={`https://alteredbeasts.s3.us-east-2.amazonaws.com/img_${props.nftId}.png`} alt="NFT" style={styles.image} />
      <div style={styles.infoContainer}>
        <div style={styles.id}>NFT ID: {props.nftId}</div>
        <div style={styles.address}>Owner: {props.ownerAddress}</div>
      </div>
    </div>
  );
}
