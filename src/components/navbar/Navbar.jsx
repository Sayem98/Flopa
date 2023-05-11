import React from "react";
import { images } from "../../assets/images/images";

import { useWallet } from "../../context/WalletContext";
const Navbar = () => {
  const { wallet, connectWallet } = useWallet();
  console.log(wallet);
  return (
    <div className="d-flex align-items-start justify-content-between py-3">
      <img src={images.logo} alt="logo" className="logo" />

      <button
        className="wallet d-flex align-items-center gap-2"
        onClick={connectWallet}
      >
        {wallet ? (
          wallet.substring(0, 6) + "..." + wallet.substring(38)
        ) : (
          <>
            <img src={images.wallet} alt="wallet" />
            Connect wallet
          </>
        )}
      </button>
    </div>
  );
};

export default Navbar;
