const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

let provider;
//deploy to Rinkeby test network using infura and the MetaMask seed words
provider =  new HDWalletProvider(
  'length peace seat balance pet note copy impose divert rifle lock hobby',
  'https://rinkeby.infura.io/v3/22a0aa32d784482393a03f6caa4e3c37'
);

//deploy to local ganache
// provider = new Web3.providers.HttpProvider(
//   'http://127.0.0.1:7545'
// );

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ gas: '1000000', from: accounts[0] });

  console.log(JSON.stringify(JSON.parse(interface), null, '  '));
  console.log('Contract deployed to', result.options.address);
};

deploy();
