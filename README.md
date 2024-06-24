# dapp-example

## Getting Started

There are 2 ways to test out this example:

1. [![Open in Codeflow](https://developer.stackblitz.com/img/open_in_codeflow.svg)](https:///pr.new/mexicanace/dapp-example)
2. Update the URL of your browser from `https://` to `https://pr.new/`, this should open this repo within StackBlitz CodeFlow.

## What does this test repo do?

* Starts up Stackblitz instance
* Installs all npm packages
* Uses `solcjs` to compile `backend/contracts/Greeter.sol` (output is `backend/artifacts/contracts/Greeter.sol/Greeter.json`)
* Starts an In-Memory Ethereum Node using Ganache (port `8050`) with one Rich Wallet (`0x36615cf349d7f6344891b1e7ca7c72883f5dc049`)
* Runs `backend/example.js` to validate the node is running and the Rich Wallet has a balance of `100 ETH`
* (TODO) ~Deploys Greeter.json to the In-Memory Ethereum Node~
* Install dependencies for the frontend
* Open the browser and start running the frontend in developer mode

## What should I do once the frontend is running?

* You can verify that the connected wallet has `100 ETH`
* You can use `Send Transaction` to send `1 ETH` to another address, this will also increment the Block Number
* TBD

## What work is remaining?

[ ] Need to generate the Emscripten compilation of `zksolc`
[ ] Get `era-test-node` to compile in WASM so it can replace the Ganache node
[ ] Deploy the compiled `Greeter.json` to the local node (Validated I could deploy to the Nethermind public devnet from within StackBlitz)
[ ] Simplify the `package.json` files for faster startup time
[ ] POST requests are denied by StackBlitz, find a way to connect Metamask
