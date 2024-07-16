import React, { useState, useEffect } from "react";
import "./HomePage.css";
import tshirtTemplate from "../tshirt1.png";
import tshirtImage2 from "../tshirt2.png";
import tshirtImage3 from "../tshirt3.png";
import { useNavigate } from 'react-router-dom';
import useAccounts from "../logic/accounts-hook";
/* global BigInt */

function HomePage() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [tokenIndices, setTokenIndices] = useState([]);
  // const [accounts, setAccounts] = useState();
  const { connected, accounts } = useAccounts();

  // const account = useAccount();
  const [tshirtImages, setTshirtImages] = useState([
    tshirtTemplate,
    tshirtImage2,
    tshirtImage3,
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % tshirtImages.length);
    }, 5000); // Change slides every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const goToPrevSlide = () => {
    setActiveIndex((current) =>
      current === 0 ? tshirtImages.length - 1 : current - 1
    );
  };

  const goToNextSlide = () => {
    setActiveIndex((current) => (current + 1) % tshirtImages.length);
  };
  const getCounter = async () => {
    const count = 20// await contract.methods.tokenCounter().call();
    const maxImagesToShow = 3; // Adjust if you want more images
    const indices = new Array(maxImagesToShow).fill().map((_, i) => count - BigInt(i + 1));
    setTokenIndices(indices);
    setTshirtImages(
      indices.map((i) => {
        return i >= 0 ? `https://alteredbeasts.s3.us-east-2.amazonaws.com/nft_${i}.png` : null;
      }).filter(url => url)
    );
  };

  return (
    <div className="home-container">
      <h1 className="main-heading">NFT-Shirt Collection</h1>
      <p className="sub-heading">Our most recent designs</p>
      <div className="carousel-container">
        <div className="carousel-arrow left" onClick={() => goToPrevSlide()}>
          &lt;
        </div>
        {tshirtImages.map((image, index) => (
          <div key={index} className="tshirt-image-container" onClick={() => navigate(`/${tokenIndices[index]}`)}>
            <img src={tshirtTemplate} alt="T-Shirt Template" className={`tshirt-base carousel-image ${index === activeIndex ? "active" : ""}`}/>
            <img src={image} alt={`QR Code ${/nft_{0-9}+\.png/.exec()}`} className={`qr-code carousel-image ${index === activeIndex ? "active" : ""}`}/>
          </div>
        ))}
        <div className="carousel-arrow right" onClick={() => goToNextSlide()}>
          &gt;
        </div>
      </div>
      { connected && accounts?.length > 0 &&
      <div className="signed-in">
        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/2048px-MetaMask_Fox.svg.png' alt="metamask"></img>
        <p>Signed in with MetaMask: {accounts[0]?.substring(0, 4)}...{accounts[0]?.substring(accounts[0].length - 4)}</p>
      </div>
      }
    </div>
  );
}

export default HomePage;
