const Web3 = require("web3");
var web3;

if (window.ethereum) {
  web3 = new Web3(window.ethereum);
 } 
//else if (window.web3) {
//   const provider = new Web3.providers.HttpProvider(
//     "https://kovan.infura.io/v3/7473fbc3ac8a4ea9a00e3cf2a7f30125"
//   );
//   web3 = new Web3(provider);
// } else {
//   const provider = new Web3.providers.HttpProvider(
//     "https://kovan.infura.io/v3/7473fbc3ac8a4ea9a00e3cf2a7f30125"
//   );
//   web3 = new Web3(provider);
// }

export default web3;
