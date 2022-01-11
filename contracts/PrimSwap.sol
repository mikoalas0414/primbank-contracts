// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.11;

import "./PrimBank.sol";

contract PrimSwap {
  string public name = "PrimSwap Exchange";
  PrimBank public primBankContract;
  uint public rate = 100;

  event TokensPurchased(
    address account,
    address primBankContract,
    uint amount,
    uint rate
  );

  event TokensSold(
    address account,
    address primBankContract,
    uint amount,
    uint rate
  );

  constructor(PrimBank _primBankContract)  {
    primBankContract = _primBankContract;
  }

  function buyTokens() public payable {
    // Calculate the number of tokens to buy
    uint tokenAmount = msg.value * rate;

    // Require that PrimSwap has enough tokens
    require(primBankContract.balanceOf(address(this)) >= tokenAmount);

    // Transfer tokens to the user
    primBankContract.transfer(payable(msg.sender), tokenAmount);

    // Emit an event
    emit TokensPurchased(payable(msg.sender), address(primBankContract), tokenAmount, rate);
  }

  function sellTokens(uint _amount) public {
    // User can't sell more tokens than they have
    require(primBankContract.balanceOf(msg.sender) >= _amount);

    // Calculate the amount of Ether to redeem
    uint etherAmount = _amount / rate;

    // Require that PrimSwap has enough Ether
    require(address(this).balance >= etherAmount);

    // Perform sale
    primBankContract.transferFrom(payable(msg.sender), address(this), _amount);
    payable(msg.sender).transfer(etherAmount);

    // Emit an event
    emit TokensSold(payable(msg.sender), address(primBankContract), _amount, rate);
  }

}
