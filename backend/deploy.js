const { Web3 } = require("web3");

// Loading the contract ABI and Bytecode
// (the results of a previous compilation step)
const fs = require("fs");
const { abi, bytecode } = JSON.parse(fs.readFileSync("artifacts/contracts/Greeter.sol/Greeter.json"));

const NODE_PORT = process.env.npm_package_stackblitz_env_NODE_PORT || '8545';
const TEST_WALLET_KEY = process.env.npm_package_stackblitz_env_TEST_WALLET_KEY || "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

async function main() {
  // Configuring the connection to an Ethereum node
  const web3 = new Web3(`http://localhost:${NODE_PORT}`);
  // Creating a signing account from a private key
  const signer = web3.eth.accounts.privateKeyToAccount(
    TEST_WALLET_KEY
  );
  web3.eth.accounts.wallet.add(signer);
  console.log(`Account for deployment: ${signer.address}`);

  // Using the signing account to deploy the contract
  const contract = new web3.eth.Contract(abi);
  contract.options.data = bytecode;
  const deployTx = contract.deploy();

  const gasEstimate = await deployTx.estimateGas();
  console.log(`Gas Estimate: ${Web3.utils.fromWei(gasEstimate, "ether")} ETH`);
  const deployedContract = await deployTx
    .send({
      from: signer.address,
      gas: gasEstimate,
    })
    .once("transactionHash", (txhash) => {
      console.log(`Mining deployment transaction ...`);
    });
  // The contract is now deployed on chain!
  console.log(`Contract deployed at ${deployedContract.options.address}`);
}

main();