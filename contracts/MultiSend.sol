pragma solidity >=0.8.0 <0.9.0

contract MultiSend {

  address private owner;
  
  
  function amountsSum (uint[] memory amounts) private returns (uint ret) {
  
    uint sum = 0;
    
    for(uint i = 0; i < amounts.length; i++) {
      sum += amounts[i];
    }
    return sum;
  }
  
}
