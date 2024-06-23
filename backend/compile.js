const fs = require("fs").promises;
const solc = require("solc");

async function main() {
  console.log(solc.version());
  // Load the contract source code
  const sourceCode = await fs.readFile("contracts/Greeter.sol", "utf8");
  // Compile the source code and retrieve the ABI and Bytecode
  const { abi, bytecode } = compile(sourceCode, "Greeter");
  // Store the ABI and Bytecode into a JSON file
  const artifact = JSON.stringify({ abi, bytecode }, null, 2);
  fs.mkdir('artifacts/contracts/Greeter.sol', { recursive: true }, (err) => {
    if (err) throw err;
  });
  await fs.writeFile("artifacts/contracts/Greeter.sol/Greeter.json", artifact);
}

function compile(sourceCode, contractName) {
  // Create the Solidity Compiler Standard Input and Output JSON
  const input = {
    language: "Solidity",
    sources: { main: { content: sourceCode } },
    settings: { outputSelection: { "*": { "*": ["abi", "evm.bytecode"] } } },
  };
  // Parse the compiler output to retrieve the ABI and Bytecode
  const output = solc.compile(JSON.stringify(input));
  if (output.errors) {
    console.log(output.errors[0]);
  }

  const artifact = JSON.parse(output).contracts.main[contractName];
  return {
    abi: artifact.abi,
    bytecode: artifact.evm.bytecode.object,
  };
}

main()