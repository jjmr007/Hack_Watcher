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
					console.log({address: tx.from, value: tx.value, data: tx.input, at: new Date()});
				}
				
			}
		}
	}
}

//let lWatch = new LiveWatch('0x6E2fb26a60dA535732F8149b25018C9c0823a715'); // instance of watcher on SOVRYN protocol address
let lWatch = new LiveWatch('0x543b6777a13E1Fbbf8ABAF08692F0Ad67Ca352FC'); // instance of watcher on SOVRYN LEVERAGING & LENDING DoC protocol address
//let lWatch = new LiveWatch('0xb01f116199C5ee8E2977B0a9280fe392c4162838'); // instance of watcher on SOVRYN LENDING RBTC protocol address
//let lWatch = new LiveWatch('0xCb46C0DdC60d18eFEB0e586c17AF6Ea36452DaE0'); // instance of watcher on DoC ERC20 address
setInterval(() => { 

	lWatch.lastBlock(); 

}, 1000 * 7); // intervals longer than 7 seconds increase the risk to loose a block
// so intensive repetitive loop is not convinient: can make twice or more times the same 'for()' loop & too demanding RPC to the full node