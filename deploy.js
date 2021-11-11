const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const dotenv = require("dotenv");

const { abi, evm } = require("./compile");

dotenv.config();

const provider = new HDWalletProvider(
	process.env.MNEMONIC,
	process.env.INFURA_URL
);

const web3 = new Web3(provider);

const deploy = async () => {
	const accounts = await web3.eth.getAccounts();

	const contract = await new web3.eth.Contract(abi)
		.deploy({ data: evm.bytecode.object })
		.send({ gas: "1000000", from: accounts[0] });

	console.log("ABI =>", abi);

	console.log("Contract deployed to =>", contract.options.address);
	provider.engine.stop();
};

deploy();
