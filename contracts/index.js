const ganache = require("ganache-cli");

const options = {};
const server = ganache.server(options);
const PORT = 8050; // 0 means any available port
console.log(`Starting server with port ${PORT}`);
server.listen(PORT, async err => {
  if (err) throw err;

  console.log(`ganache listening on port ${server.address().port}...`);
});