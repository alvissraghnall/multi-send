pragma solidity ^0.8.4;

contract MultiSend {
  
  uint total_value;
  
  event Transfer(address indexed from, address indexed to, uint256 value);

  error InsufficientBalance(uint256 sent, uint256 maxAvailable);
  
  constructor() payable {
    total_value = msg.value;
  }
  
  function amountsSum (uint[] memory amounts) private returns (uint ret) {
  
    uint sum = 0;
    
    for(uint i = 0; i < amounts.length; i++) {
      sum += amounts[i];
    }
    return sum;
  }
  
  function deposit(uint256 amount) payable public {
    //require(msg.value == amount);
    total_value += msg.value;
  }
  
  function send(address payable receiverAddr, uint receiverAmnt) private {
    receiverAddr.transfer(receiverAmnt);
  }
  
  function sendAll (address payable[] memory addresses, uint[] memory amounts) payable public {
  
    require(addresses.length == amounts.length, "Must provide same number of addresses and amounts.");
    
    uint amtSum = amountsSum(amounts);
    
    if (total_value < amtSum) {
      revert InsufficientBalance({
        sent: amtSum,
        maxAvailable: total_value
      });
    }
        
      
    for (uint i = 0; i < addresses.length; i++) {
      total_value -= amounts[i];
      send(addresses[i], amounts[i]);
      emit Transfer(address(this), addresses[i], amounts[i]);
    }
  }
}

