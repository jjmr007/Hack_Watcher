const Web3 = require("web3");
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const xhrAppT = new XMLHttpRequest();
const xhrTransT = new XMLHttpRequest();
const xhrAppM = new XMLHttpRequest();
const xhrTransM = new XMLHttpRequest();

class SocketWatch {
  // endpoint to server
  endpoint;
  // web3;
  web3ws;
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
    this.endpoint1T = 'https://api.telegram.org/bot%token/sendMessage?chat_id=%chatId&text=%message';
    this.endpoint2T = 'https://api.telegram.org/bot%token/sendMessage?chat_id=%chatId&text=%message';
    this.endpoint1M = 'https://api.telegram.org/bot%token/sendMessage?chat_id=%chatId&text=%message';
    this.endpoint2M = 'https://api.telegram.org/bot%token/sendMessage?chat_id=%chatId&text=%message';

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

  findTxAppT() {
    require('dotenv').config();
    this.endpoint2T = this.endpoint2T.replace('%token', process.env.TOKEN).replace('%chatId', process.env.CHAT_ID);
    var Mssge2T = "Finding emitted Approval events ON RSK TESTNET...";
    console.log(Mssge2T);
    var urlSend2T = this.endpoint2T.replace('%message', Mssge2T);
      xhrAppT.open('GET', urlSend2T);
      xhrAppT.send();
    this.subscription.on("data", (eVnt) => {
      console.log(eVnt);
      Mssge2T = "new APPROVAL event found to DOC contract ON RSK TESTNET at transaction: " + eVnt.transactionHash + "; at the block number: " + eVnt.blockNumber + ", with block hash number: " + eVnt.blockHash;
      urlSend2T = this.endpoint2T.replace('%message', Mssge2T);
      xhrAppT.open('GET', urlSend2T);
      xhrAppT.send();
    });
  }

  findTxAppM() {
    require('dotenv').config();
    this.endpoint2M = this.endpoint2M.replace('%token', process.env.TOKEN).replace('%chatId', process.env.CHAT_ID);
    var Mssge2M = "Finding emitted Approval events ON RSK MAINNET...";
    console.log(Mssge2M);
    var urlSend2M = this.endpoint2M.replace('%message', Mssge2M);
      xhrAppM.open('GET', urlSend2M);
      xhrAppM.send();
    this.subscription.on("data", (eVnt) => {
      console.log(eVnt);
      Mssge2M = "new APPROVAL event found to DOC contract ON RSK MAINNET at transaction: " + eVnt.transactionHash + "; at the block number: " + eVnt.blockNumber + ", with block hash number: " + eVnt.blockHash;
      urlSend2M = this.endpoint2M.replace('%message', Mssge2M);
      xhrAppM.open('GET', urlSend2M);
      xhrAppM.send();
    });
  }  

    findTxTransT() {
    require('dotenv').config();
    this.endpoint1T = this.endpoint1T.replace('%token', process.env.TOKEN).replace('%chatId', process.env.CHAT_ID);
    var Mssge1T = "Finding emitted Transfer events ON RSK TESTNET...";
    console.log(Mssge1T);
    var urlSend1T = this.endpoint1T.replace('%message', Mssge1T);
      xhrTransT.open('GET', urlSend1T);
      xhrTransT.send();
    this.subscription.on("data", (eVnt) => {
      console.log(eVnt);
      Mssge1T = "new TRANSFER event found to DOC contract ON RSK TESTNET at transaction: " + eVnt.transactionHash + "; at the block number: " + eVnt.blockNumber + ", with block hash number: " + eVnt.blockHash;
      urlSend1T = this.endpoint1T.replace('%message', Mssge1T);
      xhrTransT.open('GET', urlSend1T);
      xhrTransT.send();
    });
  }

    findTxTransM() {
    require('dotenv').config();
    this.endpoint1M = this.endpoint1M.replace('%token', process.env.TOKEN).replace('%chatId', process.env.CHAT_ID);
    var Mssge1M = "Finding emitted Transfer events ON RSK MAINNET...";
    console.log(Mssge1M);
    var urlSend1M = this.endpoint1M.replace('%message', Mssge1M);
      xhrTransM.open('GET', urlSend1M);
      xhrTransM.send();
    this.subscription.on("data", (eVnt) => {
      console.log(eVnt);
      Mssge1M = "new TRANSFER event found to DOC contract ON RSK MAINNET at transaction: " + eVnt.transactionHash + "; at the block number: " + eVnt.blockNumber + ", with block hash number: " + eVnt.blockHash;
      urlSend1M = this.endpoint1M.replace('%message', Mssge1M);
      xhrTransM.open('GET', urlSend1M);
      xhrTransM.send();
    });
  }  

}

let sKm = "wss://mainnet.sovryn.app:443/ws";
let sKt = "wss://testnet.sovryn.app:443/ws";

let SckWatch1T = new SocketWatch(sKt);
let SckWatch2T = new SocketWatch(sKt);

let SckWatch1M = new SocketWatch(sKm);
let SckWatch2M = new SocketWatch(sKm);

let Eapprov = "Approval(address,address,uint256)";
let Etrans = "Transfer(address,address,uint256)";

let DOCm = "0xe700691da7b9851f2f35f8b8182c69c53ccad9db"; // mainnet
let DOCt = "0xcb46c0ddc60d18efeb0e586c17af6ea36452dae0"; // testnet

SckWatch1T.serverListen(DOCt, Etrans);
SckWatch2T.serverListen(DOCt, Eapprov);

SckWatch1M.serverListen(DOCm, Etrans);
SckWatch2M.serverListen(DOCm, Eapprov);

SckWatch1M.findTxTransM();
SckWatch2M.findTxAppM();

SckWatch1T.findTxTransT();
SckWatch2T.findTxAppT();