const ganache = require("ganache-cli");

const options = {
  wallet: {
    accounts:
      "0x7726827caac94a7f9e1b160f7ea819f172f7b6f9d2a97f992c38edeab82d4110,50000000000000000000",
  },
};
const server = ganache.server(options);
const PORT = 8050; // 0 means any available port
console.log(`Starting server with port ${PORT}`);
server.listen(PORT, async (err) => {
  if (err) throw err;

  console.log(`ganache listening on port ${server.address().port}...`);
});
