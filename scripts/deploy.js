const { ethers, config } = require("@nomiclabs/buidler");
const { readArtifact } = require("@nomiclabs/buidler/plugins");

async function main() {
  const Library = await ethers.getContractFactory("IterableMapping");
  const library = await Library.deploy();
  await library.deployed();

  const cArtifact = await readArtifact(config.paths.artifacts, "BankEth");
  const linkedBytecode = linkBytecode(cArtifact, { Library: library.address });
  const Contract = await ethers.getContractFactory(
    cArtifact.abi,
    linkedBytecode
  );

  const contract = await Contract.deploy();
  await contract.deployed();

  console.log("Contract address:", contract.address);
}

function linkBytecode(artifact, libraries) {
  let bytecode = artifact.bytecode;

  for (const [fileName, fileReferences] of Object.entries(
    artifact.linkReferences
  )) {
    for (const [libName, fixups] of Object.entries(fileReferences)) {
      const addr = libraries[libName];
      if (addr === undefined) {
        continue;
      }

      for (const fixup of fixups) {
        bytecode =
          bytecode.substr(0, 2 + fixup.start * 2) +
          addr.substr(2) +
          bytecode.substr(2 + (fixup.start + fixup.length) * 2);
      }
    }
  }

  return bytecode;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });