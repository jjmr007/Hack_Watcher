const Web3 = require('web3');

class LiveWatch {
	web3;
	account;
	
	constructor(account){
		this.web3 = new Web3(new Web3.providers.HTTPProvider('https://public-node.testnet.rsk.co'))
		
		
	}
	
}