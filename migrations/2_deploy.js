const IterableMapping = artifacts.require("IterableMapping");
const primBank = artifacts.require("PrimBank");
const primSwap = artifacts.require("PrimSwap");

module.exports = function (deployer) {
  deployer.deploy(IterableMapping).then(() => {
    deployer.link(IterableMapping, primBank);
    return deployer.deploy(primBank).then(() => deployer.deploy(primSwap, primBank.address));
  });
};

// module.exports = function (deployer) {
//   deployer.deploy(IterableMapping).then(() => {
//     deployer.deploy(BNBank);
//   });
//   deployer.link(IterableMapping, BNBank);
// };
