import { Provider, Wallet } from "zksync-ethers";
import * as hre from "hardhat";
import { Deployer } from "@matterlabs/hardhat-zksync";
// import { DeployFunction } from "hardhat-deploy/types";
// import { HardhatRuntimeEnvironment } from "hardhat/types";
import { ethers } from "ethers";
const NODE_PORT = process.env.npm_package_stackblitz_env_NODE_PORT || '8050';
const TEST_WALLET_KEY = process.env.npm_package_stackblitz_env_TEST_WALLET_KEY;
// import Greeter from "../Greeter.json";

// const deploy2 = async function () {
//   const provider = new ethers.JsonRpcProvider("https://zksync-devnet.nethermind.io");
//   const wallet = new ethers.Wallet(
//     TEST_WALLET_KEY,
//     provider
//   );
//   const contract = new ethers.ContractFactory(Greeter.abi, Greeter.bytecode);
//   const tx = await contract.connect(wallet).deploy();
//   console.log(tx);
//   const address = await tx.getAddress();
//   console.log(address);
// };

const deploy = async (contractArtifactName: string, constructorArguments?: any[]) => {
  const provider = new Provider("https://zksync-devnet.nethermind.io");
  const wallet = new Wallet(
    TEST_WALLET_KEY!,
    provider
  );
  const deployer = new Deployer(hre, wallet);
  const artifact = await deployer.loadArtifact(contractArtifactName).catch((error) => {
    if (error?.message?.includes(`Artifact for contract "${contractArtifactName}" not found.`)) {
      console.error(error.message);
      throw `⛔️ Please make sure you have compiled your contracts or specified the correct contract name!`;
    } else {
      throw error;
    }
  });
  console.log(artifact);

  // Estimate contract deployment fee
  const deploymentFee = await deployer.estimateDeployFee(artifact, constructorArguments || []);
  console.log(`Estimated deployment cost: ${ethers.formatEther(deploymentFee)} ETH`);

  // Deploy the contract to zkSync
  const contract = await deployer.deploy(artifact, constructorArguments || []);
  console.log('xxx');
  const address = await contract.getAddress();
  console.log('xxx');
  const constructorArgs = contract.interface.encodeDeploy(constructorArguments || []);
  console.log('xxx');
  const fullContractSource = `${artifact.sourceName}:${artifact.contractName}`;

  // Display contract deployment info
  console.log(`\n"${artifact.contractName}" was successfully deployed:`);
  console.log(` - Contract address: ${address}`);
  console.log(` - Contract source: ${fullContractSource}`);
  console.log(` - Encoded constructor arguments: ${constructorArgs}\n`);
}

export default async function () {
  await deploy("Greeter");
}
