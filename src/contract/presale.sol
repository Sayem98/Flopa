/**
 *Submitted for verification at Etherscan.io on 2023-05-08
*/

/**
 *Submitted for verification at Etherscan.io on 2023-02-12
*/

// SPDX-License-Identifier: MIT
// File: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Context.sol


// OpenZeppelin Contracts v4.4.1 (utils/Context.sol)

pragma solidity ^0.8.0;

/**
 * @dev Provides information about the current execution context, including the
 * sender of the transaction and its data. While these are generally available
 * via msg.sender and msg.data, they should not be accessed in such a direct
 * manner, since when dealing with meta-transactions the account sending and
 * paying for execution may not be the actual sender (as far as an application
 * is concerned).
 *
 * This contract is only required for intermediate, library-like contracts.
 */
abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }
}

// File: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol


// OpenZeppelin Contracts (last updated v4.7.0) (access/Ownable.sol)

pragma solidity ^0.8.0;


/**
 * @dev Contract module which provides a basic access control mechanism, where
 * there is an account (an owner) that can be granted exclusive access to
 * specific functions.
 *
 * By default, the owner account will be the one that deploys the contract. This
 * can later be changed with {transferOwnership}.
 *
 * This module is used through inheritance. It will make available the modifier
 * `onlyOwner`, which can be applied to your functions to restrict their use to
 * the owner.
 */
abstract contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor() {
        _transferOwnership(_msgSender());
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        _checkOwner();
        _;
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view virtual returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if the sender is not the owner.
     */
    function _checkOwner() internal view virtual {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions anymore. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby removing any functionality that is only available to the owner.
     */
    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        _transferOwnership(newOwner);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Internal function without access restriction.
     */
    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}

// File: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol


// OpenZeppelin Contracts (last updated v4.6.0) (token/ERC20/IERC20.sol)

pragma solidity ^0.8.0;

/**
 * @dev Interface of the ERC20 standard as defined in the EIP.
 */
interface IERC20 {
    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);

    /**
     * @dev Returns the amount of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves `amount` tokens from the caller's account to `to`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address to, uint256 amount) external returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address owner, address spender) external view returns (uint256);

    /**
     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 amount) external returns (bool);

    /**
     * @dev Moves `amount` tokens from `from` to `to` using the
     * allowance mechanism. `amount` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);
}

// File: contracts/TokenSale.sol



pragma solidity ^0.8.0;




contract TokenSale is Ownable {

    uint public rateStage1BNB; // amount of tokens to recieve per unit of bnb
    
    
    uint public totalSold;

    uint public tokenLimitStageOne = 77700000000e18;
    
    mapping (address => bool) public isWhitelisted;
    bool public onlyWhitelist;


    
    uint public minPurchaseAmount = 10e18;
    uint public maxPurchaseAmount = 1000000e18; // max amount of tokens that can be purchased by an address

    // address public constant USDT = 0x55d398326f99059fF775485246999027B3197955; // BSC mainnet addresses
    // address public constant BUSD = 0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56;
    
    address public constant USDT = 0x0E15b932c24Ad612E551dC397DDda2b17C942773; // BSC mainnet addresses
    address public constant BUSD = 0x0E15b932c24Ad612E551dC397DDda2b17C942773;


    IERC20 public token;

    struct Purchase {
        uint amount;
        uint remaining;
        uint payouts;
        uint nextVestingTime;
    }

    mapping(address => Purchase) public stageOnePurchases;
    mapping (address => uint) public balances;

    bool public openClaim;

    event Purchased(address account, uint amount, uint purchaseTime);
    event Claimed(address account, uint amount, uint stage);

    constructor(address _token, uint _rateBNB) {
        token = IERC20(_token);
        rateStage1BNB = _rateBNB;
        
    }  

    /*//////////////////////////////////////////////////////////////
                               PRESALE
    //////////////////////////////////////////////////////////////*/

    function purchaseWithBNB(address referral) public payable {
        

        if(onlyWhitelist){

            require(isWhitelisted[msg.sender], "You are not white listed to buy");
        }

        uint rate =rateStage1BNB;
        

        uint amount = msg.value * rate;

        require(
            totalSold + amount
             <= 
            tokenLimitStageOne, "SALE_ENDED");
        require(amount >= minPurchaseAmount, "INVALID_AMOUNT");

        
        unchecked {
            stageOnePurchases[msg.sender].amount += amount;
        }
        require(stageOnePurchases[msg.sender].amount <= maxPurchaseAmount, "EXCEEDS_MAX_PURCHASE_AMOUNT");
        stageOnePurchases[msg.sender].remaining = stageOnePurchases[msg.sender].amount;
        //token.transfer(msg.sender, amount);
        balances[msg.sender] = balances[msg.sender] + amount;
        

        unchecked {
            totalSold = totalSold + amount;
        }

        uint referAmount = 0;
        if(referral != address(0)) {
            referAmount = (msg.value * 5) / 100;
            (bool referOk, ) = payable(referral).call{value: referAmount}("");
            require(referOk, "REFER_FAILED");
        }

        (bool ok, ) = payable(owner()).call{value: msg.value - referAmount}("");
        require(ok, "PRICE_TRANSFER_FAILED");

        emit Purchased(msg.sender, amount, block.timestamp);
    }


    // user can withdraw token then the claim is opened by owner...

    function withdraw() public { 

        require(openClaim, "Claim is not opened yet");
        uint amount = balances[msg.sender];
        balances[msg.sender] = 0;
        token.transfer(msg.sender, amount);

    }



    /*//////////////////////////////////////////////////////////////
                          ONLY CONTRACT OWNER
    //////////////////////////////////////////////////////////////*/


    // do not modify limit for a stage that has passed
    function setTokenLimitsPerStage(uint _tokenLimitStageOne) external onlyOwner {
        tokenLimitStageOne = _tokenLimitStageOne;
        
      
    }
    function setOpenClaim(bool _state) public onlyOwner{
        openClaim = _state;
    }

    function setPurchaseLimits(uint min, uint max) external onlyOwner {
        minPurchaseAmount = min;
        maxPurchaseAmount = max;
    }
 
    function setRatesBNB(uint _rate1) external onlyOwner {
        rateStage1BNB = _rate1;
        
    }
    
    function withdrawTokens(uint amount) external onlyOwner {
        token.transfer(msg.sender, amount);
    }

    function enableWhitelist(bool _status) external onlyOwner {
        onlyWhitelist = _status;
    }
   
    function addOrRemoveWhitelist(address[] calldata _adr, bool _status) external onlyOwner {
        uint length = _adr.length;
        for(uint i = 0; i < length; i++) {
            isWhitelisted[_adr[i]] = _status;
        }
    }
}