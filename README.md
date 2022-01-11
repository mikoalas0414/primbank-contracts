

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://www.oprimorico.com.br/">
    <img src="https://github.com/skyxcripto/primbank-contracts/blob/main/public/favicon.png" alt="Logo">
  </a>

  <h3 align="center">Project Test OsPrimos | PrimBank Contracts </h3>
</p>

<!-- ABOUT THE PROJECT -->

## Sobre o Projeto

Back-end (contratos inteligentes - solidity) para o projeto PrimBank, um projeto completo de um ativo onde os investidores recebem USD de recomepensa e possuindo assim uma exchange ou Swap 
para troca de ativos. 

### Feito Com

- Solidity
- OpenZeppelin Contracts
- Truffle 
- NodeJs
- Momiclabs plugins


<!-- GETTING STARTED -->

## Começando

Para reproduzir em sua máquina, siga os passos abaixo:

### Estrutura de Arquivos

A estrutura de arquivos está da seguinte maneira:

```bash
primbank-contracts
├── build
├── contracts
│   └── DividendPayingToken.sol
│   ├── DividendPayingTokenInterface.sol
│   ├── DividendPayingTokenOptionalInterface.sol
│   ├── ERC20.sol
│   ├── IERC20.sol
│   ├── IERC20Metadata.sol
│   ├── IterableMapping.sol
│   ├── IUniswapV2Factory.sol
│   ├── IUniswapV2Pair.sol
│   ├── IUniswapV2Router.sol
│   ├── Migrations.sol
│   ├── Ownable.sol
│   ├── PrimBank.sol
│   ├── PrimSwap.sol
│   ├── SafeMath.sol
│   ├── SafeMathInt.sol
│   ├── SafeMathUint
│   
├── migrations
├── scripts
├── test
├── hardhat.config.js
├── truffle-config.js
└── README.md
```
São implantados 3 contratos principais: PrimBank, PrimSwap e IterableMapping. 

- PrimBank é o contrato inteligente master, onde localiza todas funções internas e externas, esse contrato foi desenvolvido usando a interface
de dividendos "DividendPayingToken", para pagamentos de outros ativos, nesse caso usd.

- PrimSwap: Contrato inteligente responsável pelas funcionalidades da swap (exchange ou app de trocas de ativos) do projeto integrado ao token principal.

- IterableMapping: Biblioteca responsável por linkar todos contratos em um endereço imutável.

### Instalação

# Para instalar e reproduzir esse projeto localmente com Ganache siga: 

1. Clone o repositório 

```sh
git clone https://github.com/skyxcripto/primbank-contracts
```

2. Instale as depêndencias
```sh
yarn ou npm i 
```

3. Compile os contratos com truffle
```sh
truffle compile 
```

4. Abra o Ganache e migre o projeto para Ganache
```sh
truffle migrate --network development 
```

5. Caso queira migrar para rede da Binance Smart Chain Testnet siga:
```sh
truffle migrate --network testnet 
```

O arquivo de migração se encontra na pasta migrations: 


```javascript
// ...
const IterableMapping = artifacts.require("IterableMapping");
const primBank = artifacts.require("PrimBank");
const primSwap = artifacts.require("PrimSwap");

module.exports = function (deployer) {
  deployer.deploy(IterableMapping).then(() => {
    deployer.link(IterableMapping, primBank);
    return deployer.deploy(primBank).then(() => deployer.deploy(primSwap, primBank.address));
  });
};
```

Primeiramente é necessário realizar o Link entre IterableMapping e primBank para depois realizar o deploy do primSwap com endereço do primBank obtivo. 

Deploy finalizado: 

<p align="center">
  <a href="https://www.oprimorico.com.br/">
    <img src="https://github.com/skyxcripto/primbank-contracts/blob/main/public/deploy.png"  alt="Logo">
  </a>

  <h3 align="center">Project Test OsPrimos | PrimBank Contracts </h3>
</p>

---


## Contato

skyxcripto - [Github](https://github.com/skyxcripto) - **producer@skynance.net**
