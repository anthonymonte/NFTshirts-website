import React, { useState, useEffect } from "react";
import "./HomePage.css";
import Carousel from 'react-bootstrap/Carousel';
import { Link, useNavigate } from 'react-router-dom';
import TShirt, { PopShirt } from "../components/tshirt";
import { useScrollY } from "../logic/utilityhooks";
import tshirtTemplate from "../tshirt1.png";
import outlined from '../outlined.png';
import useContract from "../logic/contract-hook";
/* global BigInt */

function HomePage() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [tokenIndices, setTokenIndices] = useState([]);
  const [tshirtImages, setTshirtImages] = useState(['https://alteredbeasts.s3.us-east-2.amazonaws.com/nft_40.png', 'https://alteredbeasts.s3.us-east-2.amazonaws.com/nft_41.png', 'https://alteredbeasts.s3.us-east-2.amazonaws.com/nft_40.png']);
  const scrollY = useScrollY();
  // const [accounts, setAccounts] = useState();
  const { connected, accounts } = useContract();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % tshirtImages.length);
    }, 5000); // Change slides every 5 seconds

    return () => clearInterval(interval);
  }, []);



  // useEffect(() => {
  //   if (contract) {
  //     getCounterFromContract();
  //   }
  // }, [contract])

  const goToPrevSlide = () => {
    setActiveIndex((current) =>
      current === 0 ? tshirtImages.length - 1 : current - 1
    );
  };

  const goToNextSlide = () => {
    setActiveIndex((current) => (current + 1) % tshirtImages.length);
  };
  const getCounterFromContract = async () => {
    // const count = await contract.methods.tokenCounter().call();
    // makeIndicies(count);
  };
  const getCounterFromApi = async () => {
    // fetch('')
    makeIndicies(8n);
  }

  useEffect(() => console.log(tshirtImages), [tshirtImages]);

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
    <div className="scroll-div">
      <div className="home-container">
        <div>
          <h1 className="main-heading">{'NFT-Shirts'}</h1>
          {/* <p className="sub-heading">Our most recent designs</p> */}
        </div>
        <div className="grid-container">
          <img alt='image1' src={outlined} className={`small-shirt${scrollY < 2500? ' hide' : ''}`} />
          <img alt='image1' src={outlined} className={`small-shirt${scrollY < 2500? ' hide' : ''}`} />
          <img alt='image1' src={outlined} className={`small-shirt${scrollY < 2500? ' hide' : ''}`} />
          <img alt='image1' src={outlined} className={`small-shirt${scrollY < 2500? ' hide' : ''}`} />
          <div className={`pop-shirt ${scrollY > 500 && scrollY <= 2500? 'pop' : ''} ${scrollY < 2500? 'grow' : ''}`}>
            <img alt='image1' src={outlined} className='small-shirt transition' />
            <img alt='image1' src={tshirtImages[0]} className='code code-1' />
            <img alt='image1' src={tshirtImages[0]} className='code code-2' />
            <img alt='image1' src={tshirtImages[0]} className='code code-3' />
          </div>
          <img alt='image1' src={outlined} className={`small-shirt${scrollY < 2500? ' hide' : ''}`} />
          <img alt='image1' src={outlined} className={`small-shirt${scrollY < 2500? ' hide' : ''}`} />
          <img alt='image1' src={outlined} className={`small-shirt${scrollY < 2500? ' hide' : ''}`} />
          <img alt='image1' src={outlined} className={`small-shirt${scrollY < 2500? ' hide' : ''}`} />
        </div>

        {connected && accounts?.length > 0 &&
          <div className="signed-in">
            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/2048px-MetaMask_Fox.svg.png' alt="metamask"></img>
            <p>Signed in with MetaMask: {accounts[0]?.substring(0, 4)}...{accounts[0]?.substring(accounts[0].length - 4)}</p>
          </div>
        }
      </div>
    </div>
  );
}

export default HomePage;
