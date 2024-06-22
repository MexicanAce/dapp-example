const ganache = require("ganache-cli");

const NODE_PORT = process.env.npm_package_stackblitz_env_NODE_PORT || '8050';
const TEST_WALLET_KEY = process.env.npm_package_stackblitz_env_TEST_WALLET_KEY;

const options = {
  accounts: [
    {
      "balance": "0x56BC75E2D63100000", // 100 ETH
      "secretKey": TEST_WALLET_KEY,
    },
  ],
};
const server = ganache.server(options);
const PORT = NODE_PORT; // 0 means any available port
console.log(`Starting server with port ${PORT}`);
server.listen(PORT, async (err) => {
  if (err) throw err;

  console.log(`ganache listening on port ${server.address().port}...`);
});
