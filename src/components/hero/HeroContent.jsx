import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import Input from "../input/Input";
import { images } from "../../assets/images/images";
import Button from "../Button/Button";
import { useWallet } from "../../context/WalletContext";
import useContact from "../../hooks/useContract";
import Web3 from "web3";
const HeroContent = () => {
  const { wallet } = useWallet();
  const {
    getTokenBalance,
    getPrice,
    purchaseWithBNB,
    claim,
    getClaimableToken,
  } = useContact();
  const [balance, setBalance] = useState(0);
  const [price, setPrice] = useState(0);
  const [token, setToken] = useState(0);
  const [amount, setAmount] = useState(0);
  const [claimableToken, setClaimableToken] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const balance = await getTokenBalance(wallet);
      const price = await getPrice();
      const claimableToken = await getClaimableToken(wallet);
      setBalance(Web3.utils.fromWei(balance, "ether"));
      setClaimableToken(Web3.utils.fromWei(claimableToken, "ether"));
      setPrice(price);
    };

    if (wallet) {
      getData();
    }
  }, [wallet]);

  const handleChange = (e) => {
    setAmount(e.target.value);
    setToken(e.target.value * price);
  };

  //   console.log(Number(amount));

  return (
    <div className="hero-content">
      <h2 className="head-text mb-4">Swap</h2>
      <div className="d-flex align-items-center gap-3">
        <Input
          className={"w-50"}
          defaultValue={"00.00"}
          placeholder={"00.00"}
          value={amount}
          onChange={handleChange}
        />
        <Dropdown className="w-50">
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            <div>
              <img className="eth" src={images.eth} alt="eth" /> ETH
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              className="d-flex align-items-center gap-3"
              href="#/action-1"
            >
              <img className="eth" src={images.eth} alt="eth" /> ETH
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div className="d-flex align-items-center justify-content-between gap-3 mt-4">
        <div className="border-line"></div>
        <img
          className="arrow position-relative"
          src={images.arrow_up_down}
          alt="arrow"
        />
        <div className="border-line"></div>
      </div>
      <div className="balance">
        <p>
          Balance: <span>{balance} $FLOP</span>
        </p>
        <div className="d-flex align-items-center gap-3">
          <Input className={"w-50"} placeholder={"00.00"} value={token} />
          <div className="div w-50 d-flex align-items-center gap-3 profile">
            <img
              src={images.floppa_profile}
              className="profile"
              alt="profile"
            />
            <p>Floppa</p>
          </div>
        </div>
      </div>
      <Button
        text={"Buy now"}
        className={"mt-4 w-100"}
        onClick={() => {
          purchaseWithBNB(amount);
        }}
      />
      <div className="d-flex align-items-center gap-3 mt-4">
        <Input
          className={"w-50"}
          defaultValue={claimableToken}
          placeholder={claimableToken}
        />
        <Button
          text={"Claim"}
          className={"buy-btn w-50"}
          onClick={() => {
            claim();
          }}
        />
      </div>
    </div>
  );
};

export default HeroContent;
