# Hack_Watcher
Early hack detector. Stage of development 2: set a connection to your telegram bot.

## Dependencies
 * web3: version 1.3.0,
 * dotenv: version 8.2.0,
 * express: version 4.15.2
 
## How to Use
At this stage the code is interacting with a Telegram bot.
1. Go to [Telegram](https://telegram.org/) website and install the app.
2. In the Telegram app search for [the BotFather](https://t.me/botfather) by @BotFather, and interact with it to create your bot. Once created, write down your bot TOKEN, and the bot address and then open your bot from your App.
3. Search for one of the bots that can identify your chat_id, like [@get_id_bot](https://t.me/get_id_bot). Write down your Chat_ID.
4. Go to the file example.env.txt and turn it into ".env" and edit it, replacing the data with your bot TOKEN and CHAT_ID.
5. Edit moNitor.js comment/uncomment the socket url / contract address for mainnet / testnet, according the network events you like to watch.
6. Run the moNitor:
```shell
>node moNitor
```

You should start to see the Transfer events of Dolar-On-Chain contract, in both, the console, and your telegram app.