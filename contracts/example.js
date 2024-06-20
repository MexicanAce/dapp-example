const { Web3 } = require('web3');
var client = new Web3("https://zksync-devnet.nethermind.io")
client.eth.getAccounts().then(console.log);
client.eth.getBalance("0x36615Cf349d7F6344891B1e7CA7C72883F5dc049").then(console.log);
