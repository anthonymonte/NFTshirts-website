import React from 'react';

function NFTGrid() {
  const nfts = [
    { imageUrl: 'https://alteredbeasts.s3.us-east-2.amazonaws.com/img_37.png', id: '1', owner: '0x123...def' },
    { imageUrl: 'https://alteredbeasts.s3.us-east-2.amazonaws.com/img_37.png', id: '2', owner: '0x456...ghi' },
    { imageUrl: 'https://alteredbeasts.s3.us-east-2.amazonaws.com/img_37.png', id: '3', owner: '0x789...jkl' },
    // Add more NFTs as needed
  ];

  const styles = {
    grid: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '20px',
      padding: '20px',
      backgroundColor: '#f9f9f9'
    },
    card: {
      width: '300px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      backgroundColor: '#fff',
      padding: '10px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center'
    },
    image: {
      width: '100%',
      height: 'auto',
      borderRadius: '5px'
    },
    info: {
      marginTop: '10px',
      fontSize: '16px'
    },
    buttonContainer: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-around',
      marginTop: '10px'
    },
    button: {
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      color: 'white',
      fontWeight: 'bold',
      cursor: 'pointer',
      width: '7rem',
      background: 'linear-gradient(to right, #1ddb20 0%, #1ddb89 100%)' // Gradient color
    }
  };

  return (
    <div style={styles.grid}>
      {nfts.map((nft) => (
        <div key={nft.id} style={styles.card}>
          <img src={nft.imageUrl} alt={`NFT ${nft.id}`} style={styles.image} />
          <div style={styles.info}>
            <div>ID: {nft.id}</div>
            <div>Owner: {nft.owner}</div>
          </div>
          <div style={styles.buttonContainer}>
            <button style={styles.button} onClick={() => console.log(`Order shirt for NFT ID: ${nft.id}`)}>Order Shirt</button>
            <button style={styles.button} onClick={() => console.log(`Send NFT ID: ${nft.id}`)}>Send</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NFTGrid;
