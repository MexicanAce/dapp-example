import { spawn } from 'child_process';
import { Web3 } from 'web3';

const child = spawn('sh', ['-c', "cd contracts && npm run start-etn >> server.log"], {
  detached: true,
  stdio: 'ignore'
});

child.unref();

function log(message) {
  console.log(`\x1b[36m%s\x1b[0m`, message);
}

log('Ganache server starting in the background...');

const url = "http://localhost:8050";
const richWalletAddress = "0x36615Cf349d7F6344891B1e7CA7C72883F5dc049";
const retryAttempts = 100;
const retryWaitTime = 500;
let attemptCounter = 1;
let client = null;

while(client == null && attemptCounter < retryAttempts) {
  try {
    client = new Web3(url);
    await client.eth.getChainId();
  } catch (error) {
    client = null;
    console.log(`Attempting to connect to ${url} failed. Trying again in ${retryWaitTime}ms (Attempt ${attemptCounter})`);
    attemptCounter++;
    await new Promise(resolve => setTimeout(resolve, retryWaitTime));
  }
}

log(`Local node is confirmed running at ${url}`);
client.eth.getChainId().then(x => {
    log(`Chain ID: ${x}`);
});
client.eth.getAccounts().then(x => {
    log(`Accounts available: ${x}`);
});
client.eth.getBalance(richWalletAddress).then(x => {
    log(`Balance of ${richWalletAddress}: ${x}`);
});
