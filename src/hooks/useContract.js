import Web3 from "web3";
import {
  CONTRACT_ABI,
  CONTRACT_ADDRESS,
  TOKEN_ABI,
  TOKEN_ADDRESS,
} from "../contract/contract.js";

function useContract() {
  const purchaseWithBNB = async (amount) => {
    // get chain id
    const chainId = await window.ethereum.request({
      method: "eth_chainId",
    });
    if (chainId !== "0xaa36a7") {
      return window.alert("Please connect to Sapolia testnet");
    }
    const web3 = new Web3(window.ethereum);
    const _contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
    if (_contract) {
      // get wallet
      const wallet = window.ethereum.selectedAddress;
      // console.log(wallet);
      console.log(amount);
      try {
        const result = await _contract.methods
          .purchaseWithBNB("0x0000000000000000000000000000000000000000")
          .send({
            from: wallet,
            value: web3.utils.toWei(amount.toString(), "ether"),
          });
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    } else {
      window.alert("Problem with buying tokens");
    }
  };

  const claim = async (wallet) => {
    const chainId = await window.ethereum.request({
      method: "eth_chainId",
    });
    console.log(chainId);
    if (chainId !== "0xaa36a7") {
      return window.alert("Please connect to Sapolia testnet");
    }
    const web3 = new Web3(window.ethereum);
    const _contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
    if (_contract) {
      // get wallet
      const wallet = window.ethereum.selectedAddress;

      try {
        const result = await _contract.methods.withdraw().send({
          from: wallet,
        });
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    } else {
      window.alert("Problem with claiming tokens");
    }
  };

  const getTokenBalance = async (wallet) => {
    const web3 = new Web3(window.ethereum);
    const _tokenContract = new web3.eth.Contract(TOKEN_ABI, TOKEN_ADDRESS);
    const result = await _tokenContract.methods.balanceOf(wallet).call();
    return result;
  };

  const getPrice = async () => {
    const web3 = new Web3(window.ethereum);
    const _contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
    const result = await _contract.methods.rateStage1BNB().call();
    return result;
  };

  const getClaimableToken = async (wallet) => {
    const web3 = new Web3(window.ethereum);
    const _contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
    const result = await _contract.methods.balances(wallet).call();
    return result;
  };

  return {
    purchaseWithBNB,
    claim,
    getTokenBalance,
    getPrice,
    getClaimableToken,
  };
}

export default useContract;
