import { ethers } from "ethers";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import Greeter from "../Greeter.json";

const deploy = async function () {
  const provider = new ethers.JsonRpcProvider("http://localhost:8050");
  const wallet = new ethers.Wallet(
    "0x7726827caac94a7f9e1b160f7ea819f172f7b6f9d2a97f992c38edeab82d4110",
    provider
  );
  const contract = new ethers.ContractFactory(Greeter.abi, Greeter.bytecode);
  const tx = await contract.connect(wallet).deploy();
  console.log(tx);
  const address = await tx.getAddress();
  console.log(address);
};

deploy();