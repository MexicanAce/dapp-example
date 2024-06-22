const { Web3 } = require('web3');

const url = "http://localhost:8050";
const richWalletAddress = "0x36615Cf349d7F6344891B1e7CA7C72883F5dc049";
var client = new Web3(url);

console.log(`Local node is confirmed running at ${url}`);
client.eth.getChainId().then(x => {
    console.log(`Chain ID: ${x}`);
});
client.eth.getAccounts().then(x => {
    console.log(`Accounts available: ${x}`);
});
client.eth.getBalance(richWalletAddress).then(x => {
    console.log(`Balance of ${richWalletAddress}: ${x}`);
});
