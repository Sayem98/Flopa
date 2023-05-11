import React, { createContext, useContext, useState, useEffect } from "react";
import { CHAIN_ID } from "../constant";
import Web3 from "web3";
// Create a new context for the wallet
const WalletContext = createContext();

// Custom hook to access the wallet context
export function useWallet() {
  return useContext(WalletContext);
}

// Wallet context provider component
export function WalletProvider({ children }) {
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    const web3 = new Web3(window.ethereum);
    if (wallet) {
      // check network chnage event
      window.ethereum.on("chainChanged", (_chainId) => {
        if (_chainId !== CHAIN_ID) {
          console.log("chainChanged", _chainId);
          //   // request metamask to switch to sapolia testnet
          //   window.ethereum.request({
          //     method: "wallet_switchEthereumChain",
          //     params: [{ chainId: CHAIN_ID }],
          //   });
          window.location.reload();
        }
        const _accounts = web3.eth.getAccounts();
        setWallet(_accounts[0]);
      });
      // check account change event
      window.ethereum.on("accountsChanged", (_accounts) => {
        setWallet(_accounts[0]);
      });
    }
  }, [wallet]);

  // Function to connect the wallet
  const connectWallet = async () => {
    if (!wallet) {
      if (window.ethereum) {
        try {
          const _chainId = await window.ethereum.request({
            method: "eth_chainId",
          });
          if (_chainId !== CHAIN_ID) {
            // request metamask to switch to sapolia testnet
            window.ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: CHAIN_ID }],
            });
          }
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          setWallet(accounts[0]);
        } catch (err) {
          console.log(err);
        }
      } else {
        window.alert("Please install MetaMask");
      }
    }
  };

  // Create the value object to be passed to the context provider
  const value = {
    wallet,
    connectWallet,
  };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
}
