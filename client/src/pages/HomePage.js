import React, { useState, useEffect } from "react";
import "./HomePage.css";
import Carousel from 'react-bootstrap/Carousel';
import useContract from "../logic/contract-hook";
import { Link, useNavigate } from 'react-router-dom';
import TShirt from "../components/tshirt";
import { useWidth } from "../logic/utilityhooks";
import tshirtTemplate from "../tshirt1.png";
import { useNavigate } from 'react-router-dom';
import useAccounts from "../logic/accounts-hook";
/* global BigInt */

function HomePage() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [tokenIndices, setTokenIndices] = useState([]);
  const { contract, error } = useContract();
  const [tshirtImages, setTshirtImages] = useState(['', '', '']);
  const width = useWidth();
  // const [accounts, setAccounts] = useState();
  const { connected, accounts } = useAccounts();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % tshirtImages.length);
    }, 5000); // Change slides every 5 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (error !== null) getCounterFromApi();
  }, [error]);

  useEffect(() => {
    if (contract) {
      getCounterFromContract();
    }
  }, [contract])

  const goToPrevSlide = () => {
    setActiveIndex((current) =>
      current === 0 ? tshirtImages.length - 1 : current - 1
    );
  };

  const goToNextSlide = () => {
    setActiveIndex((current) => (current + 1) % tshirtImages.length);
  };
  const getCounterFromContract = async () => {
    const count = await contract.methods.tokenCounter().call();
    makeIndicies(count);
  };
  const getCounterFromApi = async () => {
    // fetch('')
    makeIndicies(8n);
  }

  const makeIndicies = (count) => {
    const maxImagesToShow = 3; // Adjust if you want more images
    const indices = new Array(maxImagesToShow).fill().map((_, i) => count - BigInt(i + 1));
    setTokenIndices(indices);
    console.log(indices);
    setTshirtImages(
      indices.map((i) => {
        return i >= 0 ? `https://alteredbeasts.s3.us-east-2.amazonaws.com/nft_${i}.png` : null;
      }).filter(url => url)
    );
    console.log(indices.map((i) => {
      return i >= 0 ? `https://alteredbeasts.s3.us-east-2.amazonaws.com/nft_${i}.png` : null;
    }).filter(url => url))
  }

  return (
    <div className="home-container">
      <h1 className="main-heading">NFT-Shirt Collection</h1>
      <p className="sub-heading">Our most recent designs</p>
      {width > 700 ?
        <div className="carousel-container">
          <div className="carousel-arrow left" onClick={() => goToPrevSlide()}>
            &lt;
          </div>
          {tshirtImages.map((image, index) => (
            <div key={index} className="tshirt-image-container" onClick={() => navigate(`/${tokenIndices[index]}`)}>
              <TShirt className={`carousel-slide ${activeIndex === index ? 'focused' : ''}`} url={image} />
            </div>
          ))}
          <div className="carousel-arrow right" onClick={() => goToNextSlide()}>
            &gt;
          </div>
        </div>
        :
        <Carousel variant='dark' activeIndex={activeIndex} wrap>
        {tshirtImages.map((image, index) => (
          <Carousel.Item>
            <Link to={`/${tokenIndices[index]}`}>
              <TShirt url={image} className={`shirt-canvas`} />
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    }
      {connected && accounts?.length > 0 &&
        <div className="signed-in">
          <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/2048px-MetaMask_Fox.svg.png' alt="metamask"></img>
          <p>Signed in with MetaMask: {accounts[0]?.substring(0, 4)}...{accounts[0]?.substring(accounts[0].length - 4)}</p>
        </div>
      }
    </div>
  );
}

export default HomePage;
