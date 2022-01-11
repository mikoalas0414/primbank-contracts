require("dotenv").config();
var HDWalletProvider = require("truffle-hdwallet-provider");
var tokenKey = process.env["ENDPOINT_KEY"];
const { mnemonic, BSCSCANAPIKEY } = require("./env.json");
// const HDWalletProvider = require('@truffle/hdwallet-provider');
//
// const fs = require('fs');
// const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  plugins: ["truffle-plugin-verify"],
  api_keys: {
    bscscan: BSCSCANAPIKEY,
  },

  networks: {
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 8545, // Standard BSC port (default: none)
      network_id: "*", // Any network (default: none)
    },
    testnet: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://data-seed-prebsc-1-s2.binance.org:8545/`
        ),
      network_id: 97,
      timeoutBlocks: 200,
      confirmations: 5,
      production: true, // Treats this network as if it was a public net. (default: false)
    },
    bsc: {
      provider: () =>
        new HDWalletProvider(mnemonic, `https://bsc-dataseed1.binance.org`),
      network_id: 56,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    rinkeby: {
      host: "localhost",
      provider: function () {
        return new HDWalletProvider(
          mnemonic,
          "https://rinkeby.infura.io/v3/" + tokenKey
        );
      },
      network_id: 4,
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "^0.8.11", // Fetch exact version from solc-bin (default: truffle's version)
      docker: false, // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {
        // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: true,
          runs: 200,
        },
        evmVersion: "petersburg",
      },
    },
  },
};
