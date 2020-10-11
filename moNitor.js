const Web3 = require("web3");
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const xhr = new XMLHttpRequest();

class SocketWatch {
  // endpoint to server
  endpoint;
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
    this.endpoint = 'https://api.telegram.org/bot%token/sendMessage?chat_id=%chatId&text=%message';
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
    require('dotenv').config();
    this.endpoint = this.endpoint.replace('%token', process.env.TOKEN).replace('%chatId', process.env.CHAT_ID);
    var Mssge = "Finding emitted events...";
    console.log(Mssge);
    var urlSend = this.endpoint.replace('%message', Mssge);
      xhr.open('GET', urlSend);
      xhr.send();
    this.subscription.on("data", (eVnt) => {
      console.log(eVnt);
      Mssge = "new Transfer event found to DOC contract at transaction: " + eVnt.transactionHash + "; at the block number: " + eVnt.blockNumber + ", with block hash number: " + eVnt.blockHash;
      urlSend = this.endpoint.replace('%message', Mssge);
      xhr.open('GET', urlSend);
      xhr.send();
    });
  }
}

// let sK = "wss://mainnet.sovryn.app:443/ws";
let sK = "wss://testnet.sovryn.app:443/ws";
let SckWatch = new SocketWatch(sK);
let E = "Transfer(address,address,uint256)";
// let DOC = "0xe700691da7b9851f2f35f8b8182c69c53ccad9db"; // mainnet
let DOC = "0xcb46c0ddc60d18efeb0e586c17af6ea36452dae0"; // testnet
SckWatch.serverListen(DOC, E);
SckWatch.findTx();
