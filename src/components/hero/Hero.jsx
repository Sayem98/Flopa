import React, { useEffect, useState } from "react";
import { images } from "../../assets/images/images";
import HeroContent from "./HeroContent";
import { useWallet } from "../../context/WalletContext";
import useContact from "../../hooks/useContract";
const Hero = () => {
  
  return (
    <div className="row flex-column-reverse flex-lg-row">
      <div className="col-md-5 position-relative">
        <img className="w-100" src={images.floppa_money} alt="floppa money" />
        {/* <img className="sun_img" src={images.sun} alt="sun" /> */}
        <img
          className="title position-absolute"
          src={images.title}
          alt="title"
        />
      </div>
      <div className="col-md-7">
        <div className="position-relative">
          <img
            src={images.spring}
            className="spring-top position-absolute"
            alt="spring"
          />
          <HeroContent />
          <img
            src={images.spring}
            className="spring-bottom position-absolute"
            alt="spring"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
