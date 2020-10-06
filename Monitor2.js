const Web3 = require("web3");

class SocketWatch {
  // web3;
  webews;
  // account;
  subscription;

  constructor(
    socKet
    //, url
    //, account
  ) {
    const options = {
      // Enable auto reconnection
      reconnect: {
        auto: true,
        delay: 5000, // ms
        maxAttempts: 5,
        onTimeout: false,
      },
    };
    this.web3ws = new Web3(
      new Web3.providers.WebsocketProvider(socKet, options)
    );
    //this.web3 = new Web3(new Web3.providers.HttpProvider(url));
    //this.account = account.toLowerCase();
  }

  serverListen(contract, event) {
    this.subscription = this.web3ws.eth.subscribe(
      "logs",
      {
        address: contract,
        topics: [this.web3ws.utils.sha3(event)],
      },
      (err, res) => {
        if (err) console.error(err);
      }
    );
  }

  findTx() {
    console.log("Finding emitted event...");
    this.subscription.on("data", (eVnt) => {
      console.log(eVnt);
    });
  }
}

let sK = "wss://mainnet.sovryn.app:443/ws";
// let sK = "wss://testnet.sovryn.app:443/ws";
let SckWatch = new SocketWatch(sK);
let E = "Transfer(address,address,uint256)";
let DOC = "0xe700691da7b9851f2f35f8b8182c69c53ccad9db"; // mainnet
// let DOC = "0xcb46c0ddc60d18efeb0e586c17af6ea36452dae0"; // testnet
SckWatch.serverListen(DOC, E);
SckWatch.findTx();
