const Web3 = require('web3');

class LiveWatch {
	web3;
	account;
	
	constructor(account){
		this.web3 = new Web3(new Web3.providers.HttpProvider('https://public-node.testnet.rsk.co'));
		this.account = account.toLowerCase();
	}
	
	async lastBlock() {
		let block = await this.web3.eth.getBlock('latest');
		let bNumber = block.number;
		console.log('looking into test-RSK block #:' + bNumber);
		
		if(block != null && block.transactions != null) {
			for(let tHash of block.transactions) {
				let tx = await this.web3.eth.getTransaction(tHash);
				if(this.account == tx.to.toLowerCase()) {
					console.log('Transaction to the test-Sovryn contract found on block: ' + bNumber);
					consloe.log({address: tx.from, value: tx.value, data: tx.input, at: new Date()});
				}
				
			}
		}
	}
}

let lWatch = new LiveWatch('0x6E2fb26a60dA535732F8149b25018C9c0823a715'); // instance of watcher on SOVRYN protocol address
setInterval(() => { 

	lWatch.lastBlock(); 

}, 1000 * 7 * 3);