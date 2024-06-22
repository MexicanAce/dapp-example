import {HardhatUserConfig} from 'hardhat/types';
// import 'hardhat-deploy';
// import 'hardhat-deploy-ethers';
import "@matterlabs/hardhat-zksync";

const config: HardhatUserConfig = {
  solidity: {
    version: '0.7.6',
  },
  defaultNetwork: "demonet",
  networks: {
    demonet: {
      url: "https://zksync-devnet.nethermind.io",
      ethNetwork: "localhost",
      zksync: true
    }
  }
};
export default config;
