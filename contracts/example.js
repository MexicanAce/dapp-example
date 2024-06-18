const { Web3 } = require('web3');
var client = new Web3("http://localhost:8050")
client.eth.getAccounts().then(console.log);
