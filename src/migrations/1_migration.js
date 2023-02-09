const MultiSend = artifacts.require("MultiSend");

module.exports = function(deployer) {
  // Command Truffle to deploy the Smart Contract
  deployer.deploy(MultiSend);
};