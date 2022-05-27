const Web3 = require("web3");
var Web3WsProvider = require('web3-providers-ws');
var web3
 
var options = {
  timeout: 60000, // ms

  // Useful for credentialed urls, e.g: ws://username:password@localhost:8546
  headers: {
  },

  // Useful if requests result are large
  clientConfig: {
    
  },

  // Enable auto reconnection
  reconnect: {
      auto: true,
      delay: 5000, // ms
      maxAttempts: 5,
      onTimeout: false
  }
};

    const provider = new Web3WsProvider('wss://rinkeby.infura.io/ws/v3/7473fbc3ac8a4ea9a00e3cf2a7f30125')
    web3 = new Web3(provider)
    provider.on("error",e=> handleDisconnects(e));
    provider.on("close",e=> handleDisconnects(e));
    function handleDisconnects(e) {
       console.log("error",e);
       web3.setProvider('wss://rinkeby.infura.io/ws/v3/7473fbc3ac8a4ea9a00e3cf2a7f30125')
        
    }
  
module.exports = web3;