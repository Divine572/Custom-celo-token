const fs = require("fs");
const solc = require("solc");

const input = fs.readFileSync("CustomToken.sol", "utf8");

const output = solc.compile(
  JSON.stringify({
    language: "Solidity",
    sources: {
      "CustomToken.sol": {
        content: input,
      },
    },
    settings: {
      outputSelection: {
        "*": {
          "*": ["*"],
        },
      },
    },
  })
);

const { CustomToken } = JSON.parse(output).contracts["CustomToken.sol"];
fs.writeFileSync("CustomToken.abi", JSON.stringify(CustomToken.abi));
fs.writeFileSync("CustomToken.bin", CustomToken.evm.bytecode.object);
