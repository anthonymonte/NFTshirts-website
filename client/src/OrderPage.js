import React, { useState } from 'react';
import './OrderPage.css';

function OrderPage() {
  const [nftId, setNftId] = useState('');
  const [orderDetails, setOrderDetails] = useState({
    size: '',
    address: '',
    // ... other order details
  });

  const handleInputChange = (event) => {
    setOrderDetails({
      ...orderDetails,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmitOrder = () => {
    // Code to submit the order details to the backend
    console.log(`Ordering NFT ID: ${nftId} with details:`, orderDetails);
  };

  return (
    <div>
      <h2>Order Your NFT T-Shirt</h2>
      <input 
        type="text" 
        value={nftId} 
        onChange={(e) => setNftId(e.target.value)}
        placeholder="Enter your NFT ID"
      />
      {/* Inputs for order details like size, address, etc. */}
      <input 
        type="text" 
        name="size" 
        value={orderDetails.size} 
        onChange={handleInputChange}
        placeholder="T-Shirt Size"
      />
      <input 
        type="text" 
        name="address" 
        value={orderDetails.address} 
        onChange={handleInputChange}
        placeholder="Delivery Address"
      />
      {/* ... other inputs for order details */}
      <button onClick={handleSubmitOrder}>Submit Order</button>
    </div>
  );
}

export default OrderPage;
