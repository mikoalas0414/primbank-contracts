// hardhat.config.js
const { mnemonic, apikey } = require('./.secrets.json');

require('@nomiclabs/hardhat-ethers');
require("@nomiclabs/hardhat-etherscan");
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {

  networks: {
    testnet: {
      url: `https://data-seed-prebsc-1-s1.binance.org:8545`,
      accounts: {mnemonic: mnemonic}
    },
    mainnet: {
      url: `https://bsc-dataseed.binance.org/`,
      accounts: {mnemonic: mnemonic}
    },
    rinkeby: {
        url: `https://rinkeby.infura.io/v3/ae03e9e90419456eac75681088e9312f`,
        accounts: {mnemonic: mnemonic}
      }
  },

  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://bscscan.com/
    apiKey: apikey
  },
  solidity: {
    version: "0.6.12",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  
};