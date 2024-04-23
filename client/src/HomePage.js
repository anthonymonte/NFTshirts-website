import React, { useState, useEffect } from "react";
import "./HomePage.css";
import tshirtImage1 from "./tshirt1.png";
import tshirtImage2 from "./tshirt2.png";
import tshirtImage3 from "./tshirt3.png";
import useContract from "./contract-hook";
/* global BigInt */

function HomePage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { contract } = useContract();
  const [tshirtImages, setTshirtImages] = useState([
    tshirtImage1,
    tshirtImage2,
    tshirtImage3,
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % tshirtImages.length);
    }, 5000); // Change slides every 5 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (contract) {
      getCounter();
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

  const getCounter = async () => {
    const count = await contract.methods.tokenCounter().call();
    setTshirtImages(
      new Array(3)
        .fill(0)
        .map((_, i) => count - 1n - BigInt(i))
        .filter((i) => i >= 0)
        .map(
          (i) =>
            `https://alteredbeasts.s3.us-east-2.amazonaws.com/img_${i}.png`
        )
    );
  };

  return (
    <div className="home-container">
      <h1 className="main-heading">NFT-Shirt Collection</h1>
      <p className="sub-heading">Our most recent designs</p>
      <div className="carousel-container">
        <div className="carousel-arrow left" onClick={goToPrevSlide}>
          &lt;
        </div>
        {tshirtImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`T-Shirt ${index}`}
            className={`carousel-image ${
              index === activeIndex ? "active" : ""
            }`}
          />
        ))}
        <div className="carousel-arrow right" onClick={goToNextSlide}>
          &gt;
        </div>
      </div>
    </div>
  );
}

export default HomePage;
