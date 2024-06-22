const ganache = require("ganache-cli");

const options = {
  accounts: [
    {
      "balance": "0x56BC75E2D63100000",
      "secretKey": "0x7726827caac94a7f9e1b160f7ea819f172f7b6f9d2a97f992c38edeab82d4110",
    },
  ],
};
const server = ganache.server(options);
const PORT = 8050; // 0 means any available port
console.log(`Starting server with port ${PORT}`);
server.listen(PORT, async (err) => {
  if (err) throw err;

  console.log(`ganache listening on port ${server.address().port}...`);
});
