const spawn = require("child_process").spawn;
const Web3 = require("web3").Web3;
const fs = require("fs").promises;

const NODE_PORT = process.env.npm_package_stackblitz_env_NODE_PORT || '8545';
const TEST_WALLET_ADDRESS = process.env.npm_package_stackblitz_env_TEST_WALLET_ADDRESS;

function log(message) {
  console.log(`\x1b[92m%s\x1b[0m`, message);
}

async function main() {
  try {
    // BUGFIX: Update node task to not rely on EDR (a binary file)
    const nodeTaskToFix = 'node_modules/hardhat/builtin-tasks/node.js';
    let data = await fs.readFile(nodeTaskToFix, 'utf8');
    const updatedData = data.replace('// enable logging', '// FIXED: enable logging\nreturn provider;');
    await fs.writeFile(nodeTaskToFix, updatedData, 'utf8');

    const child = spawn('sh', ['-c', "hardhat node >> server.log"], {
      detached: true,
      stdio: 'ignore'
    });
    
    child.unref();
    
    log('Hardhat Network starting in the background...');
    
    const url = `http://localhost:${NODE_PORT}`;
    const richWalletAddress = TEST_WALLET_ADDRESS;
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
        log(`Balance of ${richWalletAddress}: ${Web3.utils.fromWei(x, "ether")} ETH`);
    });
  } catch (err) {
    console.error('Error:', err);
  }
}

main();
